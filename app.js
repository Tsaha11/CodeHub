const express=require('express');
const app=express();
const path=require('path');
const PORT=process.env.PORT || 3000;
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const authRoutes=require('./routes/auth');
const pagesRoutes=require('./routes/pages');
const session=require('express-session');
const flash=require('connect-flash');
const mongodbstore=require('connect-mongodb-session')(session);
const store=new mongodbstore({
    uri:'mongodb+srv://root:root@atlascluster.2a2wt0x.mongodb.net/Project1',
    collection:'sessions'
})
const bcrypt=require('bcrypt');
const cors=require('cors');
const { MongoDBStore } = require('connect-mongodb-session');
// app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('./Frontend'));
app.use(session({
    secret:'My secret',
    resave:false,
    saveUninitialized:false,
    store:store
}))
app.use(flash());
app.set('view engine','ejs');
app.set('views','Frontend');
app.use(authRoutes);
app.use(pagesRoutes);
mongoose.connect('mongodb+srv://root:root@atlascluster.2a2wt0x.mongodb.net/Project1').then((result) => {
    console.log('Connection established successsfully')
    app.listen(PORT,()=>{
        console.log(`Listening at ${PORT}`);
    })
}).catch((err) => {
    console.log('Error in connection');
    console.log(err);
});