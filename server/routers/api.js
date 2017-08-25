/**
 * restful api 子路由
 */

const router = require('koa-router')()
const userInfoController = require('./../controllers/user-info')
const blogController = require('./../controllers/blog')

const routers = router
  .get('/user/getUserInfo', userInfoController.getLoginUserInfo)
  .post('/user/signIn', userInfoController.signIn)
  .post('/user/signUp', userInfoController.signUp)
  .post('/user/logOff', userInfoController.logOff)
  .post('/blog/post', blogController.postBlog)
  .get('/blog/get', blogController.getBlog)
  .delete('/blog/delete', blogController.deleteBlog)
  .put('/blog/edit', blogController.editBlog)
  
module.exports = routers