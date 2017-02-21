import {
  MESSAGE,
  CONNECTED
} from './messageTypes'
import WebSocket from './websocket'


// publisher => message => envelope => channel => subscribers

// Actions.
const send = (socket, clientId) => data => {
  console.log(`sending: ${ data }`)

  // Pulsion message object:
  const msg = {
    type: MESSAGE,
    clientId,
    data,
    createdAt: Date.now()
  }

  socket.send(JSON.stringify(msg))
}

const jsonMessage = data => {
  console.log('data: ', data)
  return JSON.parse(data)
}

const handleMessage = (socket, msg) => {
  switch (msg.type) {
  case 'connected':
    socket.send(JSON.stringify({
      type: 'authenticate',
      token: "eyJhbGciOiJFUzM4NCIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpc0FjdGl2ZSI6dHJ1ZSwiaXNBZG1pbiI6dHJ1ZSwicGVybWlzc2lvbnMiOnsieWV0LWFub3RoZXItcmVzb3VyY2UiOnsiYWN0aW9ucyI6W119LCJpbXNpLXF1b3RhLW1hbmFnZXIiOnsiYWN0aW9ucyI6WyJ1c2VyczpyZWFkIiwidXNlcnM6d3JpdGUiLCJyZXNvdXJjZXM6cmVhZCIsInJlc291cmNlczp3cml0ZSIsInBlcm1pc3Npb25zOnJlYWQiLCJwZXJtaXNzaW9uczp3cml0ZSJdfSwibmV3LXJlc291cmNlIjp7ImFjdGlvbnMiOltdfSwiZGlhbWV0ZXItcXVvdGEiOnsiYWN0aW9ucyI6WyJwcm9maWxlczpyZWFkIiwicHJvZmlsZXM6d3JpdGUiLCJxdW90YXM6cmVhZCIsInF1b3Rhczp3cml0ZSIsImRldmljZXM6cmVhZCIsImRldmljZXM6d3JpdGUiXX0sInJvYmNoYXQiOnsiYWN0aW9ucyI6WyJyZWFkOnByb2ZpbGVzIiwid3JpdGU6cHJvZmlsZXMiLCJjaGF0IiwicmVhZDpmcmllbmRzIiwid3JpdGU6ZnJpZW5kcyJdfX0sImlhdCI6MTQ4NzcwMjY3MiwiZXhwIjoxNDg3Nzg5MDcyLCJpc3MiOiJjcmVkLWF1dGgtbWFuYWdlciIsInN1YiI6ImFjY2VzcyIsImp0aSI6IkhrSzVxWnFZZyJ9.EwekWvV8ijCmSWlLk0u4Req-FSEOJON2kyWjFflWn5aJbdlnus7TYow2th2q6liSVE-KHB2BjnOYqp7xbtFdVMcLiUpFpxnXmYQxWgj17SB3D3LE_5UZCUqRThuZAUCQ"
    }))
    break
  case 'authenticated':
    console.log('authenticated msg: ', msg)
    break
  case 'unauthorized':
    console.log('not authorized to connect to this resource', msg)
    socket.close()
    break
  case 'message':
  default:
    // do nothing
  }

  return msg
}

// Create Event listeners based on "on" (e.g., `pulsion.on('open', () => {})`)
const on = (socket, clientId) => (type, callback) => {
  switch (type) {
  case 'open': // socket opened
    socket.onopen = () => {
      socket.send(JSON.stringify({
        type: 'connect',
        username: clientId
      }))

      return callback
    }
    break
  case 'close':
    socket.onclose = callback
    break
  case 'message':
    socket.onmessage = e => {
      callback(handleMessage(socket, jsonMessage(e.data)))
    }
    break
  default:
    // do nothing
  }
}

// Create instance.
const init = ({
  url = '',
  clientId = 'rob'
}) => {
  // TODO: check for WebSocket feature and fail with message if non-existent
  //const ws = new window.WebSocket(url)
  const ws = WebSocket.create(url)

  // {
  //   headers: {
  //     token: "eyJhbGciOiJFUzM4NCIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoicm9iIiwiaXNBY3RpdmUiOnRydWUsImlzQWRtaW4iOmZhbHNlLCJwZXJtaXNzaW9ucyI6eyJwdWxzaW9uIjp7ImFjdGlvbnMiOlsiY2hhdCIsInByb2ZpbGUiLCJ1c2VycyIsImNvbnRhY3RzIl19LCJpbXNpLXF1b3RhLW1hbmFnZXIiOnsiYWN0aW9ucyI6W119LCJuZXctcmVzb3VyY2UiOnsiYWN0aW9ucyI6W119LCJkaWFtZXRlci1xdW90YSI6eyJhY3Rpb25zIjpbInByb2ZpbGVzOnJlYWQiLCJwcm9maWxlczp3cml0ZSIsInF1b3RhczpyZWFkIiwicXVvdGFzOndyaXRlIl19LCJyb2JjaGF0Ijp7ImFjdGlvbnMiOlsiY2hhdCJdfSwieWV0LWFub3RoZXItcmVzb3VyY2UiOnsiYWN0aW9ucyI6W119fSwiaWF0IjoxNDg2NjYwNzUwLCJleHAiOjE0ODY3NDcxNTAsImlzcyI6ImNyZWQtYXV0aC1tYW5hZ2VyIiwic3ViIjoiYWNjZXNzIiwianRpIjoiQnl2NUVtcWRsIn0.ZJvGDfGlrWguZI9-QXv1fDelPE5qjt9gqXgZJ6MWWcru_pW7oNOMwpqB84F1hMNgrsN9Qak9bv37PTbCLIN770hLAGr7Q4cFhJWdmrWlr-A6fprPVE5er3C1Mp9gUTjl"
  //   }
  // }

  return {
    on: on(ws, clientId),
    send: send(ws, clientId)
  }
}

export default {
  init
}
