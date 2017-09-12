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
  .get('/user/isLogin', userInfoController.validateLogin)
  .post('/blog/post', blogController.postBlog)
  .put('/blog/update', blogController.updateBlog)
  .get('/blog/get', blogController.getBlog)
  .get('/blog/getAll', blogController.getAll)
  .delete('/blog/delete', blogController.deleteBlog)
  .put('/blog/edit', blogController.editBlog)
  .post('/blog/postImage', blogController.postImage)
  
module.exports = routers