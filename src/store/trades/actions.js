/*
 * action types
 */

export const TRADE_UPDATE_MESSAGE = 'TRADE-UPDATE_MESSAGE';
export const TRADE_ADD_MESSAGE = 'TRADE-ADD_MESSAGE';

/*
 * action creators
 */

export function updateTrades(payload) {
  return { type: TRADE_UPDATE_MESSAGE, payload };
}

export function addTrade(payload) {
  return { type: TRADE_ADD_MESSAGE, payload };
}

/*
 * thunk actions
 */

export function tradesConnection() {
  // default symbol
  const symbol = 'tBTCUSD';
  return function(dispatch, state) {
    const ws = new WebSocket('wss://api.bitfinex.com/ws/2');

    ws.addEventListener('message', msg => {
      const data = JSON.parse(msg.data);

      if (data.event === 'subscribed') {
        dispatch(updateTrades({ symbol: data.symbol, trades: [] }));
      } else if (data.event === 'info') {
        //nothing
      } else {
        const streamFields = data[1];

        if (streamFields === 'tu') {
          const newTrade = data[2];
          dispatch(addTrade({ symbol, newTrade }));
        } else if (streamFields !== 'hb' && streamFields !== 'te') {
          const trades = streamFields;
          dispatch(updateTrades({ symbol, trades }));
        }
      }
    });

    const msg = JSON.stringify({
      event: 'subscribe',
      channel: 'trades',
      symbol
    });
    ws.addEventListener('open', () => ws.send(msg));
    ws.addEventListener('error', error => {
      console.error(
        'Socket encountered error: ',
        error.message,
        'Closing socket'
      );
      ws.close();
    });
  };
}
