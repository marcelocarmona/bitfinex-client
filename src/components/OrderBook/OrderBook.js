import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { orderBookConnection } from '../../store/orderBook/actions';
import './OrderBook.css';

class OrderBook extends PureComponent {
  componentDidMount() {
    this.props.orderBookConnection();
  }

  render() {
    const { asks, bids } = this.props;
    return (
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
    );
  }
}

const mapStateToProps = state => {
  return {
    asks: state.book.asks,
    bids: state.book.bids
  };
};

const mapDispatchToProps = dispatch => {
  return {
    orderBookConnection: () => {
      dispatch(orderBookConnection());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderBook);
