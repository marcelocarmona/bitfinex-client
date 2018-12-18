/*
 * action types
 */

export const BOOK_SNAPSHOT_MESSAGE = 'BOOK-SNAPSHOT_MESSAGE';
export const BOOK_UPDATE_MESSAGE = 'BOOK-UPDATE_MESSAGE';

/*
 * action creators
 */

export function updateBook({ channel, payload }) {
  return { type: BOOK_UPDATE_MESSAGE, channel, payload };
}

export function setSnapshotBook({ channel, payload }) {
  return { type: BOOK_SNAPSHOT_MESSAGE, channel, payload };
}

/*
 * thunk actions
 */

// websocket cache
let ws = null;
/**
 * Maintain the book connection, just one connection can exist at the same time
 *
 * @param {string} frequency Frequency of updates (F0, F1).F0=realtime / F1=2sec
 * @param {string} presision Level of price aggregation (P0, P1, P2, P3)
 */
export function orderBookConnection(frequency, presision) {
  return function(dispatch, state) {
    // check if no exist a current connection
    if (!ws) {
      ws = new WebSocket('wss://api.bitfinex.com/ws/2');
    } else {
      ws.close();
      ws = new WebSocket('wss://api.bitfinex.com/ws/2');
    }

    // open
    ws.addEventListener('open', () => {
      const { symbol, freq, prec } = state().book.channel;
      const msg = JSON.stringify({
        event: 'subscribe',
        channel: 'book',
        symbol,
        freq: frequency ? frequency : freq,
        prec: presision ? presision : prec
      });
      ws.send(msg);
    });

    // message
    let channel = null;
    ws.addEventListener('message', msg => {
      const data = JSON.parse(msg.data);
      if (data.event === 'subscribed') {
        channel = data;
      } else if (data.event === 'info') {
        // nothing yet
      } else {
        const streamFields = data[1];
        if (streamFields.length === 50) {
          dispatch(setSnapshotBook({ channel, payload: data }));
        } else {
          if (streamFields !== 'hb') {
            dispatch(updateBook({ channel, payload: data }));
          }
        }
      }
    });

    // error
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
