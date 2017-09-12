const Koa = require('koa')
const views = require('koa-views')
const path = require('path') 
const static = require('koa-static')
const mime = require('mime')
const blogService = require('./../services/blog')
const blogCode = require('./../codes/blog')

module.exports = {
    async postBlog(ctx) {

        let session = ctx.session,
            blogData = ctx.request.body,
            result = {
                success: false,
                message: 'You are not login yet!',
                data: {},
                code: ''
            }
        if(session && session.isLogin) {
            let blogResult = await blogService.postBlog(blogData);
            if(blogResult && blogResult.blogId) {
                const blogId = blogResult.blogId;
                console.log('Post blog success= ', blogId);
                result.success = true;
                result.data.blogId = blogId;
                result.message = 'Post success!'
            }else {
                result.message = blogCode.ERROR_SYS
            }
        }
        console.log(result);
        ctx.body = result;
    },

    async updateBlog(ctx) {
            let session = ctx.session,
            blogData = ctx.request.body,
            result = {
                success: false,
                message: 'You are not login yet!',
                data: {},
                code: ''
            }
        if(session && session.isLogin) {
            let blogResult = await blogService.updateBlog(blogData);
            if(blogResult) {
                console.log('Update blog success!');
                result.success = true;
                result.message = 'Update success!'
            }else {
                result.message = blogCode.ERROR_SYS
            }
        }
        console.log(result);
        ctx.body = result;
    },
    
    async getBlog(ctx) {
        let session = ctx.session,
            req_query = ctx.request.query,
            editable = false,
            result = {
                success: false,
                message: 'Blog not found',
                data: {
                    editable:false,
                    blog: null,
                },
                code: '404'
            }

        if(session && session.isLogin) {
            result.data.editable = true;
        }

        let blog = await blogService.getBlog(req_query);

        if(blog && blog.blogId === req_query.id) {
            result.success = true;
            result.message = 'Get blog success';
            result.data.blog = blog;
            result.code = '200';
        }
        
        ctx.body = result;
    },

    async deleteBlog(ctx) {
        let session = ctx.session,
            req_query = ctx.request.query,
            result = {
                success: false,
                message: 'Delete failed',
                data: null,
                code: ''
            }
        if(session && session.isLogin) {
            let deleteResult = await blogService.deleteBlog(req_query);
            if(deleteResult) {
                result.success = true;
                result.message = '';
            }
        }

        ctx.body = result;
    },

    async editBlog(ctx) {
        let session = ctx.session,
            req_query = ctx.request.query,
            blogData = ctx.request.body,
            result = {
                success: false,
                message: 'Update failed',
                data: null,
                code: ''
            }
        
        if(session && session.isLogin) {
            let editResult = await blogService.editBlog(req_query, blogData);
            if(editResult) {
                result.success = true;
                result.message = '';
            }
        }

        ctx.body = result;
    },

    async postImage(ctx) {
        let session = ctx.session,
            result = {
                success: false,
                message: 'Fail',
                data: null,
                code: ''
            };
        if(session && session.isLogin) {
            const serverFilePath = path.join(__dirname, './../static/image');
            result = await blogService.postImage(ctx, {
                fileType: 'album',
                path: serverFilePath
            })
            console.log('result = ', result)
        }

        ctx.body = result;
    },

    parseMime(url) {
        let extName = path.extname(url);
        extName = extName ? extName.slice(1) : null;
        return mimes[extName]
    },

    async getEdit(ctx) {
        let session = ctx.session,
            editable = false;
        
        if(session && session.isLogin) {
            result.data.editable = true;
            let blog = await blogService.getEdit();

            if(blog) {
                result.success = true;
                result.message = 'Get blog success';
                result.data.blog = blog;
                result.code = '200';
            }
        }
        
        ctx.body = result;
    },

    async getAll(ctx) {
        let session = ctx.session,
            page = ctx.request.query.page,
            result = {
                success: false,
                message: 'No more blogs',
                data: {
                    blogs: null,
                },
                code: '404'
            }
        console.log('get blogs = ', page);
        const blogs = await blogService.getAll(page);
        if(blogs) {
            result.success = true;
            result.message = 'Get blogs success';
            result.data.blogs = blogs;
            result.code = '200';
        }
        
        ctx.body = result;
    },
}