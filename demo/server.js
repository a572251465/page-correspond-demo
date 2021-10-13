const ws = require('ws')

const wss = new ws.WebSocketServer({ port: 3000 })
const clients = []
wss.on('connection', function (socket) {
  console.log('websocket connect success')
  if (clients.indexOf(socket) === -1) {
    clients.push(socket)

    socket.on('message', function (message) {
      console.log(message.toString(), clients.length)

      for (let key of clients) {
        if (key !== socket) {
          key.send(message.toString())
        }
      }
    })
  }
})
