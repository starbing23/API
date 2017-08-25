const blogModel = require('./../models/blog')
const blogCode = require('./../codes/blog')

const blog = {
    async postBlog(blogData) {
        const blogId = new Date().getTime();
        let resultData = await blogModel.postBlog({
            title: blogData.title,
            body: blogData.body,
            blogId: blogId
        });
        return resultData
    },

    async getBlog(query) {
        let blog = null,
            result = await blogModel.getBlog({
                id: query.id
            });

        if(result) {
            blog = {
                title: result.title,
                blogId: result.blogId,
                body: result.body
            }
        }
        return blog
    },

    async deleteBlog(query) {
        let result = await blogModel.deleteBlog({
            id: query.id
        })

        return result
    },

    async editBlog(query, data) {
        let result = await blogModel.editBlog({
            blogId: query.id,
            title: data.title,
            body: data.body
        });
        return result
    }
}

module.exports = blog