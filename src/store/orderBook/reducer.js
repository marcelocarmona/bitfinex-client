import { BOOK_UPDATE_MESSAGE, BOOK_SNAPSHOT_MESSAGE } from './actions';

const initialState = {
  asks: {},
  bids: {}
};

function book(state = initialState, action) {
  switch (action.type) {
    case BOOK_SNAPSHOT_MESSAGE:
      const books = action.payload[1];
      return books.reduce(
        (acc, [price, count, amount], currentIndex) =>
          currentIndex < 25
            ? {
                ...acc,
                asks: { ...acc.asks, [price]: { amount, count, price } }
              }
            : {
                ...acc,
                bids: { ...acc.bids, [price]: { amount, count, price } }
              },
        initialState
      );
    case BOOK_UPDATE_MESSAGE:
      /*
        when count > 0 then you have to add or update the price level
        3.1 if amount > 0 then add/update bids
        3.2 if amount < 0 then add/update asks
        when count = 0 then you have to delete the price level.
        4.1 if amount = 1 then remove from bids
        4.2 if amount = -1 then remove from asks
      */
      const [price, count, amount] = action.payload[1];
      if (count > 0) {
        if (amount > 0) {
          return {
            ...state,
            bids: { ...state.bids, [price]: { amount, count, price } }
          };
        }
        if (amount < 0) {
          return {
            ...state,
            asks: { ...state.asks, [price]: { amount, count, price } }
          };
        }
      } else if (count === 0) {
        if (amount === 1) {
          const bidsCopy = { ...state.bids };
          delete bidsCopy[price];
          return {
            ...state,
            bids: bidsCopy
          };
        }
        if (amount === -1) {
          const asksCopy = { ...state.asks };
          delete asksCopy[price];
          return {
            ...state,
            asks: asksCopy
          };
        }
      }
      return {
        ...state
      };
    default:
      return state;
  }
}

export default book;
