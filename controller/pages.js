const express=require('express');
const quote=require('../Schema/quotes');
const getHome=async(req,res,next)=>{
    try{
        const qoutes=await quote.find();
        if(qoutes!=null){
            res.render('ejs/home',{title:'home',qoutes:qoutes});
        }
    }
    catch(er){
        console.log(er);
        console.log('Error');
        res.redirect('/compiler')
    }
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