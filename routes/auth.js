const express=require('express');
const router=express.Router();
const controller=require('../controller/auth');
router.get('/login',controller.getLogin)
router.get('/signup',controller.getSignup)
module.exports=router;