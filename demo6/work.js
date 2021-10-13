const portList = []

onconnect = function (e) {
  const port = e.ports[0]
  ensurePorts(port)

  port.onmessage = function (e) {
    dispatch(port, e.data)
  }
  port.start()
}

function ensurePorts(port) {
  if (!portList.includes(port)) {
    portList.push(port)
  }
}

function dispatch(selfPort, data) {
  portList.filter((port) => selfPort !== port).forEach((port) => port.postMessage(data))
}
