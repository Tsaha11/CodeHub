const mongoose=require('mongoose');
const easySchema=new mongoose.Schema({
    header:{
        type:String,required:true
    },
    link:{
        type:String,required:true
    },
    question:{
        type:String,required:true
    },
    input:{
        type:String,required:true
    },
    output:{
        type:String,required:true
    },
    done:{
        type:Boolean
    }
});
const mediumSchema=new mongoose.Schema({
    header:{
        type:String,required:true
    },
    link:{
        type:String,required:true
    },
    question:{
        type:String,required:true
    },
    input:{
        type:String,required:true
    },
    output:{
        type:String,required:true
    },
    done:{
        type:Boolean
    }
});
const headSchema=new mongoose.Schema({
    header:{
        type:String,required:true
    },
    link:{
        type:String,required:true
    },
    question:{
        type:String,required:true
    },
    input:{
        type:String,required:true
    },
    output:{
        type:String,required:true
    },
    done:{
        type:Boolean
    }
});
const a=mongoose.model('easy-questions',easySchema);
const b=mongoose.model('medium-questions',mediumSchema);
const c=mongoose.model('hard-questions',headSchema);
module.exports={a,b,c};