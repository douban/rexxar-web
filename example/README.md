# example

这个例子展示了如何在 Rexxar 中开发和部署一个页面，你可能需要 [rexxar-ios](https://github.com/douban/rexxar-ios) 或 [rexxar-android](https://github.com/douban/rexxar-android) 的集成使它运行起来。

## 安装

```bash
$ git clone https://github.com/douban/rexxar-web
$ cd rexxar-web/example
$ npm i
```

## 调试

```bash
$ gulp serve
```
gulp serve 启动调试服务器之后，你可以在浏览器中通过  `http://localhost:8080/rexxar/demo.html?uri=douban://douban.com/rexxar_demo/` 这样的url来查看页面。

如果你需要 iOS/Android Container 访问调试服务器上的页面，则应该在 `serve` 的时候明确指定机器的ip。
```bash
$ gulp serve --ip 192.168.0.250
```
然后将 Container 中的 routes 地址改为 `http://192.168.0.250:8080/routes.json` 这样的地址。

## 部署

本地调试完成后，通过以下命令可以在 `dist` 目录下生成一系列打包后的资源：
```bash
$ gulp deploy
```
在这个例子中我们用 `raw.githubusercontent.com` 作为我们的静态资源存放地址，iOS/Android Container 通过访问 `dist/routes.json` 获取路由文件。当然你可以使用自己的CDN服务器来存放资源，并且可以根据需求定制自己的测试环境和线上环境。


## Web example 内容简介

```
├── src/
│   ├── map.json           uri 配置文件
│   ├── rexxar/            一个业务目录
│   │   ├── components/    页面组成
│   │   └── demo.js        页面入口
│   └── common/            通用目录
│       ├── ContainerAPI/  Rexxar 数据服务
│       └── Widget/        Rexxar 组件
├── dist/
│   ├── routes.json        Rexxar Route 需要的路由文件
│   ├── rexxar/            页面资源
│   │   └── demo.html
│   └── common/            通用资源
│       └── vendor.js
└── tasks/                 构建任务
```

### Gulp

我们使用 [Gulp](https://github.com/gulpjs/gulp) 作为构建工具，提供 `serve` 和 `deploy` 两个命令。这里构建的目标是，编译 js/css 资源，打包并生成资源文件，必要时将资源内联写入 html，最后给 html 打上 hash，并根据 map 配置生成一份 routes 路由表。你可以使用任何喜欢的工具组合来实现这个目标，或者使用例子中编写好的 tasks。

### Route

[Rexxar Route](http://lincode.github.io/Rexxar-OpenSource) 是 Rexxar 页面运行的基础，这里我们直接将 routes.json 写入静态资源目录，供客户端访问。当 html 内容更新的时候，routes 中的文件 hash 也会随之更新。当然，你在实际的项目开发中可能需要区分出测试环境下的 routes，与线上环境隔离，这是需要一个类似 `pre-dist` 的目录。更好的做法可以是通过 API 的方式来动态的获取 routes 配置，你可以根据需要选择不同的方案。

### Widget

在 Rexxar 中，我们把需要 Web 和 Container 配合才能实现的页面效果，封装成一个 Widget。一个 RexxarWidget 通过预先定义好的协议格式与 Container 进行通信，但它应该隐藏内部的协议实现，而对外暴露出统一易用的接口，使得 Web 业务代码对于 Widget 的调用就和普通的前端组件并无二致。在例子的 `common/Widget` 下展示了几个常用的 Widget，包括 `AlertDialog`, `NavTitle`, `NavMenu`, `Toast`。你可以作为参照来实现自己的 RexxarWidget。

### ContainerAPI

ContainerAPI 提供了对访问 Container 数据的支持，Rexxar 页面通过模拟 API 请求的方式发起调用，Container 以 Response 的形式返回数据。在 Rexxar 中，Container 会对所有发往服务器的 API 请求进行代理以加上必要的认证信息，而 ContainerAPI 是以特定的域名发起的请求，`common/ContainerAPI` 下展示了如何发送一个 `log`，和如何获取 `geo` 信息。
