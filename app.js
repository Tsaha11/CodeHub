const express=require('express');
const app=express();
const path=require('path');
const PORT=process.env.PORT || 3000;
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const authRoutes=require('./routes/auth');
const pagesRoutes=require('./routes/pages');
const cors=require('cors');
// app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('./Frontend'));
app.set('view engine','ejs');
app.set('views','Frontend');
app.use(authRoutes);
app.use(pagesRoutes);
// var request = require('request');
// var program = {
//     script : "<?php ec]\\\ho \"hello\";?>",
//     language: "php",
//     versionIndex: "0",
//     clientId: "1b81d7d2dfcc83475f0c9dcf87c63260",
//     clientSecret:"2296d646ee12e65b4362d99171eeff24611b75e6b2060a80199be47e365f7810"
// };
// request({
//     url: 'https://api.jdoodle.com/v1/execute',
//     method: "POST",
//     json: program
// },
// function (error, response, body) {
//     console.log('error:', error);
//     console.log('statusCode:', response && response.statusCode);
//     console.log('body:', body);
// })
// app.post('/compiler',(req,res,next)=>{
//     const text=req.body;
//     console.log(text);
//     res.json({f:110});
// })
mongoose.connect('mongodb+srv://root:root@atlascluster.2a2wt0x.mongodb.net/Project1').then((result) => {
    console.log('Connection established successsfully')
    app.listen(PORT,()=>{
        console.log(`Listening at ${PORT}`);
    })
}).catch((err) => {
    console.log('Error in connection');
    console.log(err);
});