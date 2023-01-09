const express=require('express');
const app=express();
const fs=require('fs');
const path=require('path');
const PORT=process.env.PORT || 3000;
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const authRoutes=require('./routes/auth');
const https=require('https')
const pagesRoutes=require('./routes/pages');
const session=require('express-session');
const flash=require('connect-flash');
const morgan=require('morgan');
const helmet=require('helmet');
const compression=require('compression');
const mongodbstore=require('connect-mongodb-session')(session);
const store=new mongodbstore({
    uri:'mongodb+srv://root:root@atlascluster.2a2wt0x.mongodb.net/Project1',
    collection:'sessions'
})
const bcrypt=require('bcrypt');
const cors=require('cors');
const { MongoDBStore } = require('connect-mongodb-session');
app.use(cors());
// const privateKey=fs.readFileSync("server.key");
// const certificate=fs.readFileSync("server.cert");
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
const accessLog=fs.createWriteStream(
    path.join(__dirname,'access.log'),
    {flags:'a'}
)
app.use(helmet());
app.use(compression());
app.use(morgan('combined',{stream:accessLog}));
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@atlascluster.2a2wt0x.mongodb.net/Project1`).then((result) => {
    // https.createServer({key:privateKey,cert:certificate},app).listen(PORT);
    app.listen(PORT);
}).catch((err) => {
    console.log('Error in connection');
    console.log(err);
});