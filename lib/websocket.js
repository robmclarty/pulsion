//import WebSocket from 'ws'

const WebSocket = window.WebSocket

// Wrap `new WebSocket` with function `create` to encapsulate the implementation.
const create = url => new WebSocket(url)

export default {
  create
}
