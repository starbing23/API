const blogService = require('./../services/blog')
const blogCode = require('./../codes/blog')

module.exports = {
    async postBlog(ctx) {

        let session = ctx.session,
            blogData = ctx.request.body,
            result = {
                success: false,
                message: '',
                data: null,
                code: ''
            }
        if(session && session.isLogin) {
            let blogResult = await blogService.postBlog(blogData);
            if(blogResult && blogResult.insertId * 1 > 0) {
                result.success = true;
            }else {
                result.message = blogCode.ERROR_SYS
            }
        }

        ctx.body = result;
    },
    
    async getBlog(ctx) {
        let session = ctx.session,
            req_query = ctx.request.query,
            editable = false,
            result = {
                success: false,
                message: '',
                data: {
                    editable:false,
                    blog: null,
                },
                code: ''
            }
        console.log('getBlog query =', req_query);
        if(session && session.isLogin) {
            result.data.editable = true;
        }

        let blog = await blogService.getBlog(req_query);

        if(blog && blog.blogId === req_query.id) {
            result.success = true;
            result.message = 'Get blog success';
            result.data.blog = blog;
        }
        ctx.body = result;
    }
}