/*
 * action types
 */

export const TICKER_OPEN = 'TICKER_OPEN';
export const TICKER_UPDATE_MESSAGE = 'TICKER-UPDATE_MESSAGE';
export const TICKER_CLOSE = 'TICKER_CLOSE';

/*
 * action creators
 */

export function openTickerConnection() {
  return {
    type: TICKER_OPEN,
    payload: {
      event: 'subscribe',
      channel: 'trades',
      symbol: 'tBTCUSD'
    }
  };
}

export function updateTicker(payload) {
  return { type: TICKER_UPDATE_MESSAGE, payload };
}

export function stopTickerConnection(payload) {
  return { type: TICKER_CLOSE, payload };
}

/*
 * thunks actions
 */

export function tickerConnection() {
  return function(dispatch) {
    const w = new WebSocket('wss://api.bitfinex.com/ws/2');

    w.addEventListener('message', msg => {
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

    let msg = JSON.stringify({
      event: 'subscribe',
      channel: 'ticker',
      symbol: 'tBTCUSD'
    });
    w.addEventListener('open', () => w.send(msg));
  };
}
