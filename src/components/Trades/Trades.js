import React, { PureComponent } from 'react';
import './Trades.css';

class Traders extends PureComponent {
  state = { trades: [] };
  componentDidMount() {
    const w = new WebSocket('wss://api.bitfinex.com/ws/2');

    w.addEventListener('message', msg => {
      const data = JSON.parse(msg.data);

      if (data.event === 'subscribed') {
        this.setState({ pair: data.pair });
      } else if (data.event === 'info') {
        //nothing
      } else {
        const streamFields = data[1];

        if (streamFields === 'tu') {
          const newTrade = data[2];
          const tradesWithoutLastOne = this.state.trades.slice(0, -1);
          this.setState({ trades: [newTrade, ...tradesWithoutLastOne] });
        } else if (streamFields !== 'hb' && streamFields !== 'te') {
          const trades = streamFields;
          this.setState({ trades });
        }
      }
    });

    let msg = JSON.stringify({
      event: 'subscribe',
      channel: 'trades',
      symbol: 'tBTCUSD'
    });
    w.addEventListener('open', () => w.send(msg));
  }

  render() {
    const { trades } = this.state;
    return (
      <div className="trade">
        <table>
          <thead>
            <tr>
              <th />
              <th>TIME</th>
              <th>AMOUNT</th>
              <th>PRICE</th>
            </tr>
          </thead>
          <tbody>
            {trades.map(([ID, MTS, AMOUNT, PRICE]) => (
              <tr
                key={ID}
                className={AMOUNT > 0 ? 'trade--bought' : 'trade--sold'}
              >
                <td>{AMOUNT > 0 ? '🔺' : '🔻'}</td>
                <td>{new Date(MTS * 1000).toLocaleTimeString()}</td>
                <td>{AMOUNT}</td>
                <td>{PRICE}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Traders;
