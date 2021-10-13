## 实现页面通信的几种方式

### 1. 第一种通信方式：websocket

```
  1. 服务端实现webSocket 来进行中间转发，收到每个消息发送给每个client socket
  2. 每个页面实现webSocket 来跟服务进行通信，发送消息给服务，转发到其余的页面
  3. 缺陷：必须服务端支持，来进行消息转发
```

### 2. 第二种通信方式：轮询 + localStorage

```
  1. 针对同一个key，一个页面设置消息
  2. 另一个页面通过轮询不断的获取消息
  3. 缺陷：需要一直轮询来获取消息
```

### 3. 第三种通信方式：window.open 句柄

```
  1. 通过window.open 来打开新的页面后，拿到新页面的句柄opener,通过函数postMessage来发送消息
  2. 父类通过window.addEventListener('message', fn)来监听发送的消息
```

### 4. 第四种通信方式：iframe

```
  1. 父类页面进行iframe设置src，加载页面。同时发送消息iframe.contentWindow.postMessage
  2. iframe页面通过实现window.addEventListener('message', fn)来监听发送消息
```

### 5. 第五种通信方式：StorageEvent

```
  1. 一个页面进行window.localStorage的内容设置
  2. 另一个页面监听window.addEventListener('storage')
```

### 6. 第六种通信方式：BroadcastChannel

```
  1. 多个页面以相同的key 实例化new BroadcastChannel()
  2. 一个页面通过实例.postMessage('消息'), 其余的页面通过window.addEventListener('message', fn)来接受消息
```

### 7. 第七种通信方式：SharedWorker 共享工作者线程

```
  1. 共享工作者线程跟专用共享线程不同，虽然每次都会进行实例化，但是如果发现标识存在后就不会再次实例化，而是直接连接
  2. 共享工作者线程的标识取决于解析url地址，name等
  3. 所以SharedWorker 可以在多个标签页运行，其实就是启动一个发布订阅的作用。跟webSocket类似
```

### 8. 第八种通信方式：MessageChannel

```
  1. MessageChannel API允许我们建立一个通道，并通过它的两个MessagePort属性发送数据
  2. 但是需要用postMessage建立联系
```
