const blogService = require('./../services/blog')
const userCode = require('./../codes/blog')

module.exports = {
    async postBlog(ctx) {
        console.log(ctx)
        let blogData = ctx.request.body
        let result = {
        success: false,
        message: '',
        data: null,
        code: ''
        }
        let blogResult = await blogService.postBlog(blogData);
        if(blogResult) {
            
        }
    },
    
    async getBlog(ctx) {

    }
}