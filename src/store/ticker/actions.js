/*
 * action types
 */

export const TICKER_UPDATE_MESSAGE = 'TICKER-UPDATE_MESSAGE';

/*
 * action creators
 */

export function updateTicker(payload) {
  return { type: TICKER_UPDATE_MESSAGE, payload };
}

/*
 * thunk actions
 */

export function tickerConnection() {
  // default symbol
  const symbol = 'tBTCUSD';
  return function(dispatch) {
    const ws = new WebSocket('wss://api.bitfinex.com/ws/2');

    ws.addEventListener('message', msg => {
      const data = JSON.parse(msg.data);
      if (data.event === 'subscribed') {
        dispatch(updateTicker({ pair: data.pair }));
      } else if (data.event === 'info') {
        // nothing for now
      } else {
        const streamFields = data[1];
        if (streamFields !== 'hb') {
          const [
            BID,
            BID_SIZE,
            ASK,
            ASK_SIZE,
            DAILY_CHANGE,
            DAILY_CHANGE_PERC,
            LAST_PRICE,
            VOLUME,
            HIGH,
            LOW
          ] = streamFields;
          dispatch(
            updateTicker({
              BID,
              BID_SIZE,
              ASK,
              ASK_SIZE,
              DAILY_CHANGE,
              DAILY_CHANGE_PERC,
              LAST_PRICE,
              VOLUME,
              HIGH,
              LOW
            })
          );
        }
      }
    });

    const msg = JSON.stringify({
      event: 'subscribe',
      channel: 'ticker',
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
