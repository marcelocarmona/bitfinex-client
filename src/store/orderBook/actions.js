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

export function orderBookConnection() {
  // default symbol
  const symbol = 'tBTCUSD';
  let channel = null;
  return function(dispatch, state) {
    const ws = new WebSocket('wss://api.bitfinex.com/ws/2');

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

    let msg = JSON.stringify({
      event: 'subscribe',
      channel: 'book',
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
