import { TRADE_UPDATE_MESSAGE, TRADE_ADD_MESSAGE } from './actions';

const initialState = {
  tBTCUSD: []
};

function trades(state = initialState, action) {
  switch (action.type) {
    case TRADE_UPDATE_MESSAGE:
      return {
        ...state,
        [action.payload.symbol]: action.payload.trades
      };
    case TRADE_ADD_MESSAGE:
      return {
        ...state,
        [action.payload.symbol]: [
          action.payload.newTrade,
          ...state[action.payload.symbol].slice(0, -1)
        ]
      };
    default:
      return state;
  }
}

export default trades;
