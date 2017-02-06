import Pulsion from '../lib'

const pulsion = Pulsion.init({
  url: 'ws://localhost:3000/ws'
})

pulsion.on('open', e => {
  console.log('socket opened')

  pulsion.send('this is my message')
})
