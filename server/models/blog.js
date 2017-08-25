const dbUtils = require('./../utils/db-util')

const blog = {
    async postBlog(model) {
        let result = dbUtils.insertData( 'blogs', model);
        return result
    },

    async getBlog(model) {
        let _sql = `SELECT * from blogs
            where blogId="${model.id}"
            limit 1`
        let result = await dbUtils.query(_sql);
        if ( Array.isArray(result) && result.length > 0 ) {
            result = result[0]
        } else {
            result = null
        }

        return result;
    }
}

module.exports = blog