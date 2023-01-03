const express=require('express');
const router=express.Router();
// const controller=require('./controller/auth');
router.get('/',(req,res)=>{
    res.render('Compiler',{title:'Compiler'})
})
router.get('/compiler')
module.exports=router;