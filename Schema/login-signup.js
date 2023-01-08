const mongoose=require('mongoose');
const loginSchema=new mongoose.Schema({
    username:{
        type:String,required:true
    },
    email:{
        type:String,required:true
    },
    password:{
        type:String,required:true
    },
    array:[],
    doneEasy:[],
    doneMedium:[],
    doneHard:[]
});
module.exports=mongoose.model('userProfile',loginSchema);

// object sample{
//     codequestion,
//     codeheader,
//     codelink,
//     codeinput,
//     codeoutput,
//     date,
//     time,
//     method,-- receiver,send
// }
// not more than 5