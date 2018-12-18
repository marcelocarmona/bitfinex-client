import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  orderBookConnection,
  orderBookCloseConnection
} from '../../store/orderBook/actions';
import './OrderBook.css';

class OrderBook extends PureComponent {
  componentDidMount() {
    this.props.orderBookConnection('F1', 'P0');
  }

  changePrecision = event => {
    event.preventDefault();
    this.props.orderBookConnection(null, event.target.value);
  };

  changeFrequency = event => {
    event.preventDefault();
    this.props.orderBookConnection(event.target.value);
  };

  closeConnection = event => {
    event.preventDefault();
    this.props.orderBookCloseConnection();
  };

  openConnection = event => {
    event.preventDefault();
    this.props.orderBookConnection();
  };

  render() {
    const { asks, bids, channel } = this.props;
    return (
      <>
        {channel && (
          <div>
            Frequency {channel.freq}
            &nbsp;
            <select onChange={this.changeFrequency}>
              <option value="F1">F1</option>
              <option value="F0">F0</option>
            </select>
            &nbsp; Precision Level {channel.prec}
            &nbsp;
            <select onChange={this.changePrecision}>
              <option value="P0">P0</option>
              <option value="P1">P1</option>
              <option value="P2">P2</option>
              <option value="P3">P3</option>
            </select>
            &nbsp; &nbsp;
            {channel.chanId ? (
              <button onClick={this.closeConnection}>
                close book connection
              </button>
            ) : (
              <button onClick={this.openConnection}>
                open book connection
              </button>
            )}
          </div>
        )}
        <div className="book">
          <table>
            <thead>
              <tr>
                <th>COUNT</th>
                <th>AMOUNT</th>
                <th>PRICE</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(asks).map(price => (
                <tr key={price}>
                  <td>{asks[price].count}</td>
                  <td>{asks[price].amount}</td>
                  <td>{asks[price].price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>PRICE</th>
                <th>AMOUNT</th>
                <th>COUNT</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(bids).map(price => (
                <tr key={price}>
                  <td>{bids[price].price}</td>
                  <td>{bids[price].amount}</td>
                  <td>{bids[price].count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    channel: state.book.channel,
    asks: state.book.asks,
    bids: state.book.bids
  };
};

const mapDispatchToProps = dispatch => {
  return {
    orderBookConnection: (freq, prec) => {
      dispatch(orderBookConnection(freq, prec));
    },
    orderBookCloseConnection: () => {
      dispatch(orderBookCloseConnection());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderBook);
