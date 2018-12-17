import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { tradesConnection } from '../../store/trades/actions';
import './Trades.css';

class Traders extends PureComponent {
  componentDidMount() {
    this.props.tradesConnection();
  }

  render() {
    const { trades } = this.props;
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
            {trades.tBTCUSD.map(([ID, MTS, AMOUNT, PRICE]) => (
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

const mapStateToProps = state => {
  return {
    trades: state.trades
  };
};

const mapDispatchToProps = dispatch => {
  return {
    tradesConnection: () => {
      dispatch(tradesConnection());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Traders);
