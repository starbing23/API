const blogModel = require('./../models/blog')
const blogCode = require('./../codes/blog')

const blog = {
    async postBlog(blogData) {
        const blogId = new Date().getTime();
        let resultData = await blogModel.postBlog({
            title: blogData.title,
            body: blogData.body,
            blogId: blogId,
            description: blogData.description
        });
        if(resultData.insertId * 1 > 0) {
            resultData.blogId = blogId;
        }
        return resultData
    },

    async postImage(imgData) {
        const imgId = new Date().getTime();
        let result = await blogModel.postImage(imgData);
        return result;
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
    },

    async getEdit() {
        let result = await blogModel.getEdit();
        return result
    },

    async getAll(page) {
        let result = await blogModel.getAll(page);
        console.log(result)
        result.forEach(function(blog) {
            delete blog['body'];  
        });
        return result
    },
}

module.exports = blog