const express=require('express');
const getLogin=(req,res,next)=>{
    res.render('login-signup/ejs/login',{title:'Login'})
}
const getSignup=(req,res,next)=>{
    res.render('login-signup/ejs/signup',{title:'Sign-Up'})
}
module.exports={getLogin,getSignup}