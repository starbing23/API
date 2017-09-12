const inspect = require('util').inspect
const path = require('path')
const os = require('os')
const fs = require('fs')
const Busboy = require('busboy')
const blogModel = require('./../models/blog')
const blogCode = require('./../codes/blog')

function mkdirsSync( dirname ) {
  if (fs.existsSync( dirname )) {
    return true
  } else {
    if (mkdirsSync( path.dirname(dirname)) ) {
      fs.mkdirSync( dirname )
      return true
    }
  }
}

function getSuffixName( fileName ) {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}

const blog = {
    async postBlog(blogData) {
        const blogId = new Date().getTime();
        let resultData = await blogModel.postBlog({
            title: blogData.title,
            body: blogData.body,
            blogId: blogId,
            description: blogData.description,
            headImg: blogData.headImg
        });
        if(resultData.insertId * 1 > 0) {
            resultData.blogId = blogId;
        }
        return resultData
    },

    async updateBlog(blogData) {
        let resultData = await blogModel.updateBlog({
            title: blogData.title,
            body: blogData.body,
            blogId: blogData.blogId,
            description: blogData.description,
            headImg: blogData.headImg
        });
        if(resultData.affectedRows * 1 > 0) {
            return true
        }else {
            return false
        }
    },

    async postImage(ctx, options) {
        let req = ctx.req,
            res = ctx.res,
            busboy = new Busboy({headers: req.headers});

        // 获取类型
        let fileType = options.fileType || 'common'
        let filePath = path.join( options.path,  fileType)
        let mkdirResult = mkdirsSync( filePath )

        return new Promise((resolve, reject) => {
            let result = {
                success: false,
                message: 'You are not allowed to get edit',
                data: {
                    editable:false,
                    blog: null,
                },
                code: '404'
            };

            busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
                let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename);
                let _uploadFilePath = path.join( filePath, fileName );
                let saveTo = path.join(_uploadFilePath);

                file.pipe(fs.createWriteStream(saveTo));
                file.on('end', ()=> {
                    result = {
                        success: true,
                        message: 'Image update success',
                        data: `//${ctx.host}/image/${fileType}/${fileName}`,
                        code: '200'
                    }
                    resolve(result)
                })
            })

            // 解析结束事件
            busboy.on('finish', function() {
                console.log('Upload finished')
                resolve(result)
            })

            // 解析错误事件
            busboy.on('error', function(err) {
                console.log('Upload failed')
                result = {
                    success: false,
                    message: 'Image update failed',
                    data: null,
                    code: ''
                }
                reject(result)
            })

            req.pipe(busboy)
        })
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