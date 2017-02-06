'use strict'

// Actions.
const send = ws => msg => {
  console.log(`sending: ${ msg }`)
  ws.send(msg)
}

// Event listeners.
const on = ws => (type, callback) => {
  switch (type) {
  case 'open':
    ws.onopen = callback
  case 'close':
    ws.onclose = callback
  default:
    // do nothing
  }
}

// Create instance.
const init = ({ url = '' }) => {
  // TODO: check for WebSocket feature and fail with message if non-existent
  const ws = new window.WebSocket(url)

  return {
    on: on(ws),
    send: send(ws)
  }
}

export default {
  init
}
