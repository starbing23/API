/**
 * restful api 子路由
 */

const router = require('koa-router')()
const userInfoController = require('./../controllers/user-info')
const blogController = require('./../controllers/blog')

const routers = router
  .get('/user/getUserInfo.json', userInfoController.getLoginUserInfo)
  .post('/user/signIn.json', userInfoController.signIn)
  .post('/user/signUp.json', userInfoController.signUp)
  .post('/blog/post.json', blogController.postBlog)
  .get('/blog/:id', blogController.getBlog)
 
  
module.exports = routers