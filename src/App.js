import React, { Component } from 'react';
import MainTicker from './components/MainTicker/MainTicker';
import Trades from './components/Trades/Trades';
import OrderBook from './components/OrderBook/OrderBook';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ticker from './store/ticker/reducer';
import orderBook from './store/orderBook/reducer';
import trades from './store/trades/reducer';
import thunk from 'redux-thunk';
import './App.css';

const reducers = {
  ticker,
  orderBook,
  trades
};

const reducer = combineReducers(reducers);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store: Store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunk))
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <MainTicker />
          <Trades />
          <OrderBook />
        </div>
      </Provider>
    );
  }
}

export default App;
