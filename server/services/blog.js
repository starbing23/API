const blogModel = require('./../models/blog')
const blogCode = require('./../codes/blog')

const blog = {
    async postBlog (blogData) {
        const blogId = new Date();
        let resultData = await blogModel.postBlog({
            title: blogData.title,
            body: blogData.body,
            blogId: blogId
        });
        console.log('bbbb', resultData)
        return resultData
    }
}

module.exports = blog