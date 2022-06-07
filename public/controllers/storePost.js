const BlogPost = require('../models/BlogPost.js')
const path = require('path')

module.exports = async (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, '..','public/assets/img', image.name), async(error)=>{
        await BlogPost.create({
            ...req.body,
            image: '../public/assets/img/' + image.name
        })
        res.redirect('/')
    })
}