import { TICKER_UPDATE_MESSAGE } from './actions';

const initialState = {
  pair: 'BTCUSD',
  BID: 0,
  BID_SIZE: 0,
  ASK: 0,
  ASK_SIZE: 0,
  DAILY_CHANGE: 0,
  DAILY_CHANGE_PERC: 0,
  LAST_PRICE: 0,
  VOLUME: 0,
  HIGH: 0,
  LOW: 0
};

function ticker(state = initialState, action) {
  switch (action.type) {
    case TICKER_UPDATE_MESSAGE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

export default ticker;
