import React, { PureComponent } from 'react';
import './OrderBook.css';

class OrderBook extends PureComponent {
  state = { books: null };
  componentDidMount() {
    const w = new WebSocket('wss://api.bitfinex.com/ws/2');

    w.addEventListener('message', msg => {
      const data = JSON.parse(msg.data);
      if (data.event === 'subscribed') {
        this.setState({ pair: data.pair, freq: data.freq, prec: data.prec });
      } else if (data.event === 'info') {
        //nothing
      } else {
        const streamFields = data[1];
        if (streamFields.length === 50) {
          // normalize
          const books = streamFields.reduce((acc, book) => {
            const price = book[0];
            return { [price]: book, ...acc };
          }, {});
          this.setState({ books });
        } else {
          // update books
          // const newBooks = { ...this.state.books };
          // const price = streamFields[0];
          // newBooks[price] = streamFields;
          // this.setState({ books: newBooks });
        }
      }
    });

    let msg = JSON.stringify({
      event: 'subscribe',
      channel: 'book',
      symbol: 'tBTCUSD'
    });
    w.addEventListener('open', () => w.send(msg));
  }

  render() {
    const { books } = this.state;
    return (
      books && (
        <div className="book">
          <table>
            <thead>
              <tr>
                <th>COUNT</th>
                <th>PERIOD</th>
                <th>PRICE</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(books).map((price, index) => {
                if (index < 25) {
                  return (
                    <tr key={price}>
                      <td>{books[price][1]}</td>
                      <td>{books[price][2]}</td>
                      <td>{books[price][0]}</td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>PRICE</th>
                <th>PERIOD</th>
                <th>COUNT</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(books).map((price, index) => {
                if (index >= 25) {
                  return (
                    <tr key={price}>
                      <td>{books[price][0]}</td>
                      <td>{books[price][2]}</td>
                      <td>{books[price][1]}</td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      )
    );
  }
}

export default OrderBook;
