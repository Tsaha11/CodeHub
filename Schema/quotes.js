const mongoose=require('mongoose');
const quoteSchema=new mongoose.Schema({
    qouteBody:{
        type:String,required:true
    },
    qouteWriter:{
        type:String,required:true
    }
});
module.exports=mongoose.model('quotes',quoteSchema);