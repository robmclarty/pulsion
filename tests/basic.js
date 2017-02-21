import Pulsion from '../lib'

const pulsion = Pulsion.init({
  url: 'ws://localhost:3001/chat'
})

pulsion.on('open', e => {
  console.log('socket opened', e)

  pulsion.send('this is my message')
})

pulsion.on('message', msg => {
  console.log('received: ', msg)
})

pulsion.on('close', e => {
  console.log('socket closed')
})
