const express=require('express');
const getHome=(req,res,next)=>{
    res.render('ejs/home',{title:'home'});
}
const getCompiler=(req,res,next)=>{
    res.render('ejs/compiler',{title:'compiler'});
}
const getShare=(req,res,next)=>{
    res.render('ejs/share',{title:'share'})
}
const getPractice=(req,res,next)=>{
    res.render('ejs/practice',{title:'practice'});
}
module.exports={getHome,getCompiler,getShare,getPractice};