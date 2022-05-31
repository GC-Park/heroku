const express = require('express')
const path = require('path')
const app = new express()
const ejs = require('ejs')
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')
const newPostController = require('./public/controllers/newPost')

const homeController = require('./public/controllers/home')
const storePostController = require('./public/controllers/storePost')
const getPostController = require('./public/controllers/getPost')
const newUserController = require('./public/controllers/newUser')
const storeUserController = require('./public/controllers/storeUser')
const loginController = require('./public/controllers/login')
const loginUserController = require('./public/controllers/loginUser')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(fileUpload())
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser:true})

const BlogPost = require('./public/models/BlogPost.js');
const home = require('./public/controllers/home');
const validateMiddleWare = require('./public/middleware/validationMiddleware')


app.use('/posts/store', validateMiddleWare)
app.set('view engine','ejs')
app.use(express.static('public'))
// app.get('/',(req,res)=>{
//     res.render('index');
// })
app.get('/', homeController)
app.get('/post/:id', getPostController)
app.post('/posts/store', storePostController)
app.get('/auth/register', newUserController)
app.post('/users/register', storeUserController)
app.get('/auth/login', loginController)
app.post('/users/login', loginUserController)
// app.get('/about',(req,res)=>{
//     res.render('about');
// })
// app.get('/contact',(req,res)=>{
//     res.render('contact');
// })
// app.get('/post',(req,res)=>{
//     res.render('post');
// })
// app.get('/post/:id',async (req,res)=>{
//     const blogpost = await BlogPost.findById(req.params.id)
//     res.render('post', {
//         blogpost
//     })
// })
app.get('/posts/new', newPostController)

// app.post('/posts/store', (req, res)=> {
//     let image = req.files.image;
//     image.mv(path.resolve(__dirname, 'public/assets/img' ,image.name), async(error)=>{
//             await BlogPost.create({...req.body, image:'/assets/img/'+ image.name})
//             res.redirect('/')
//         }
//     )
// })



app.listen(4000, ()=>{
    console.log('App listening on port 4000')
})