import React, { PureComponent } from 'react';
import './MainTicker.css';
import { connect } from 'react-redux';
import { tickerConnection } from '../../store/ticker/actions';

class Ticker extends PureComponent {
  componentDidMount() {
    this.props.tickerConnection();
  }

  render() {
    const {
      VOLUME,
      LOW,
      HIGH,
      LAST_PRICE,
      DAILY_CHANGE,
      DAILY_CHANGE_PERC,
      pair
    } = this.props.ticker;
    return (
      <div className="ticker">
        <div className="ticker__column">
          <div>{pair}</div>
          <div>VOL {VOLUME}</div>
          <div>LOW {LOW}</div>
        </div>
        <div className="ticker__column">
          <div>{LAST_PRICE}</div>
          <div>
            {DAILY_CHANGE}({DAILY_CHANGE_PERC}%)
          </div>
          <div>HIGH {HIGH}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ticker: state.ticker
  };
};

const mapDispatchToProps = dispatch => {
  return {
    tickerConnection: () => {
      dispatch(tickerConnection());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ticker);
