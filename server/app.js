const path = require('path')
const Koa = require('koa')
const convert = require('koa-convert') //Convert koa legacy ( 0.x & 1.x ) generator middleware to modern promise middleware ( 2.x ).
const views = require('koa-views')  //template rendering middleware
const koaStatic = require('koa-static')  //render page in server
const bodyParser = require('koa-bodyparser')  //relate to http body parser
const koaLogger = require('koa-logger')  //output log in command
const cors = require('koa2-cors')  //For CORS in dev env
const session = require('koa-session-minimal') //Native Koa 2 session middleware
const MysqlStore = require('koa-mysql-session') //mysql seesion

const config = require('./../config/config')
const routers = require('./routers/index')

const app = new Koa();

// session存储配置
const sessionMysqlConfig= {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST,
}

const maxAge = 2 * 60 * 60 * 1000;
// setup session middleware 
// save session in mysqldatabase and set session id to client and save in cookie
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig),
  cookie: {
    maxage: maxAge
  }
}))

app.use(cors({
  origin: 'http://localhost:8090',
  credentials: true,
}))

// setup logger middleware
app.use(koaLogger())

// 配置ctx.body解析中间件
app.use(bodyParser())

// 配置静态资源加载中间件
app.use(koaStatic(
  path.join(__dirname , './../static')
))

// 配置服务端模板渲染引擎中间件
// app.use(views(path.join(__dirname, './views'), {
//   extension: 'ejs'
// }))

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

// 监听启动端口
app.listen( config.port )
console.log(`the server is start at port ${config.port}`)
