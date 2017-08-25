const dbUtils = require('./../utils/db-util')

const blog = {
    async postBlog (model) {
        let result = dbUtils.insertData( 'blogs', model);
        return result
    }
}

module.exports = blog