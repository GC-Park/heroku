const mongoose = require('mongoose')
const BlogPost = require('./public/models/BlogPost')

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser:true});

// BlogPost.create({
//     title: "The Mythbuster's Guide to Saving Money on Energy Bills'",
//     body: 'If you have been here a long time, you might remember ........'
// }, (error, blogspot) =>{
//     console.log(error,blogspot)
// })

BlogPost.find({}, (error, blogspot) =>{
    console.log(error,blogspot)
})

BlogPost.find({
    title:"The Mythbuster's Guide to Saving Money on Energy Bills'"
}, (error, blogspot) =>{
    console.log(error,blogspot)
})

BlogPost.find({
    title:/The/}, (error, blogspot) =>{
        console.log(error,blogspot)
})

var id = "62830503dfcfb197d8cee26c";

BlogPost.findById(id, (error, blogspot) =>{
    console.log(error,blogspot)
})

BlogPost.findByIdAndUpdate(id,{
    title:'Updated title'
}, (error, blogspot) =>{
    console.log(error,blogspot)
})

BlogPost.findByIdAndDelete(id, (error, blogspot) =>{
    console.log(error,blogspot)
})