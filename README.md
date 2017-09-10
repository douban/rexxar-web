# rexxar-web

Rexxar 是一个针对移动端的混合开发框架。现在支持 Android 和 iOS 平台。`rexxar-web` 是 Rexxar 的 Web 端实现，提供配合 Rexxar Container 运行的基础工具。

想要运行一个例子了解使用 Rexxar 开发页面的工作流程，直接查看简单的 [example](/example)。如果要在 iOS/Android Container 查看，请至 [rexxar-ios](https://github.com/douban/rexxar-ios) 或 [rexxar-android](https://github.com/douban/rexxar-android)。

## Rexxar 简介

关于 Rexxar 的整体介绍，可以查看文档：[Rexxar 简介](http://lincode.github.io/Rexxar-OpenSource)。

关于 Rexxar iOS，可以访问：[https://github.com/douban/rexxar-ios](https://github.com/douban/rexxar-ios)。

关于 Rexxar Android，可以访问：[https://github.com/douban/rexxar-android](https://github.com/douban/rexxar-android)。

## 安装

```bash
$ npm install rexxar-web --save
```

## 使用

### widgetMessenger

`widgetMessenger` 是一个消息组装器，分段传入参数构成消息体

```js
let messenger = widgetMessenger('douban', 'rexxar-container')('widget/alert_dialog')
```

### callbackListener

`callbackListener` 将注册给定的回调函数，并挂载到全局，用于客户端调用

```js
let cbName = callbackListener('Rexxar.Widget.AlertDialog')('confirm')(() => {})
```

### assemblePayload(obj[, base])

`assemblePayload` 是将一个对象转化成消息中的payload

```js
let data = { 
  title: 'AlertDialog',
  callback: cbName,
}
let payload = assemblePayload(data)
```

### dispatch(messenger)

`dispatch` 将由widgetMessenger组装好的消息分发给客户端

```js
dispatch(messenger(payload))
```

### rexxarFetch(input[, init])

`rexxarFetch` 是对 [fetch](https://github.com/github/fetch) 的包装，提供与 [window.fetch](https://fetch.spec.whatwg.org/) 一样的接口和用法。值得注意的是，在使用 POST 时会有所限制，只允许 `content-type` 为 `application/x-www-form-urlencoded` 的请求。

```js
import { rexxarFetch } from 'rexxar-web';

rexxarFetch('/request')
  .then(response => response.json())
  .then(data =>
    console.log('request succeeded with JSON response', data)
  )
  .catch(error =>
    console.log('request failed', error)
  )
```

### getRexxarWidget(config)

**Deprecated**

配置 Widget 协议的 scheme 和 host，获取 RexxarWidget 基类，推荐使用继承的方式编写自己的组件。

```js
import { getRexxarWidget } from 'rexxar-web';

const RexxarWidget = getRexxarWidget({
  scheme: 'douban',
  host: 'rexxar-container'
});

class Title extends RexxarWidget {
  constructor(title) {
    super('title');
    this.title = title;
  }
  show() {
    super.call({ title: this.title });
  }
}
let title = new Title('My Title');
title.show();
```

## 开发与部署

关于如何开发一个 Rexxar 页面，并进行调试，部署集成，请查看 [example](/example) 目录。

### Quick Start

#### 安装

```bash
$ git clone https://github.com/douban/rexxar-web
$ cd rexxar-web/example
$ npm i
```

#### 调试

```bash
$ gulp serve
```
gulp serve 启动调试服务器之后，你可以在浏览器中通过  `http://localhost:8080/rexxar/demo.html?uri=douban://douban.com/rexxar_demo/` 这样的url来查看页面。

如果你需要 iOS/Android Container 访问调试服务器上的页面，则应该在 `serve` 的时候明确指定机器的ip。
```bash
$ gulp serve --ip 192.168.0.250
```
然后将 Container 中的 routes 地址改为 `http://192.168.0.250:8080/routes.json` 这样的地址。

#### 部署

本地调试完成后，通过以下命令可以在 `dist` 目录下生成一系列打包后的资源：
```bash
$ gulp deploy
```
在这个例子中我们用 `raw.githubusercontent.com` 作为我们的静态资源存放地址，iOS/Android Container 通过访问 `dist/routes.json` 获取路由文件。当然你可以使用自己的CDN服务器来存放资源，并且可以根据需求定制自己的测试环境和线上环境。

## ChangeLog

- v0.2.0
  1. rexxarFetch 对于 iOS WKWebView 亦将 POST 转化成 GET 来处理，需要配合 [rexxar-ios v0.3.0](https://github.com/douban/rexxar-ios#changelog) 及以上使用
  2. 新增 widgetMessenger, assemblePayload, callbackListener, dispatch
  3. 废弃 getRexxarWidget

## License

Rexxar is released under the MIT license. See LICENSE for details.
