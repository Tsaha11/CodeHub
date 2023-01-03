const express=require('express');
const app=express();
const path=require('path');
const PORT=process.env.PORT || 3000;
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const authRoutes=require('./routes/auth');
const pagesRoutes=require('./routes/pages');
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('./Frontend'));
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