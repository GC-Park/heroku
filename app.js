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
const expressSession = require('express-session')
const authMiddleware = require('./public/middleware/authMiddleware');
const redirectIfAuthenticateMiddleware = require('./public/middleware/redirectIfAuthenticateMiddleware')
const logoutController = require('./public/controllers/logout')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(fileUpload())
mongoose.connect('mongodb+srv://GC-Park:vmfkek19@cluster0.kkhcxh8.mongodb.net/test', {useNewUrlParser:true, useUnifiedTopology:true})

const BlogPost = require('./public/models/BlogPost.js');
const home = require('./public/controllers/home');
const validateMiddleWare = require('./public/middleware/validationMiddleware')

global.loggedIn = null;


app.use('/posts/store', validateMiddleWare)
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(expressSession({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))

app.use('*', (req, res, next)=> {
    loggedIn = req.session.userId;
    next()
})

// app.get('/',(req,res)=>{
//     res.render('index');
// })
app.get('/', homeController)
app.get('/post/:id', getPostController)
app.post('/posts/store',authMiddleware, storePostController)
app.get('/auth/register', redirectIfAuthenticateMiddleware, newUserController)
app.post('/users/register', redirectIfAuthenticateMiddleware, storeUserController)
app.get('/auth/login', redirectIfAuthenticateMiddleware, loginController)
app.post('/users/login', redirectIfAuthenticateMiddleware, loginUserController)
app.get('/posts/new', authMiddleware, newPostController)
app.get('/auth/logout', logoutController)
// app.post('/posts/store', authMiddleware, storePostController)

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