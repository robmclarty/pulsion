'use strict'

const ws = new WebSocket('ws://localhost:3000/ws')

const sendMessage = msg => {
  console.log(`sending: ${ msg }`)
  ws.send(msg)
}

ws.onopen = e => {
  console.log('socket opened')

  sendMessage('this is my message')
}
