const express=require('express');
const quote=require('../Schema/quotes');
const Easy=require('../Schema/problem').a;
const Medium=require('../Schema/problem').b;
const Hard=require('../Schema/problem').c;
const getHome=async(req,res,next)=>{
    try{
        const qoutes=await quote.find();
        if(qoutes!=null){
            res.render('ejs/home',{title:'home',qoutes:qoutes,isLogin:req.session.isLoggedIn});
        }
    }
    catch(er){
        console.log(er);
        console.log('Error');
        res.redirect('/compiler')
    }
}
const getCompiler=(req,res,next)=>{
    res.render('ejs/compiler',{title:'compiler',isLogin:req.session.isLoggedIn});
}
const getShare=(req,res,next)=>{
    res.render('ejs/share',{title:'share',isLogin:req.session.isLoggedIn})
}
const getPractice=async(req,res,next)=>{
    try{
        const data=await Easy.find().skip(0).limit(20);
        if(data!=null){
            res.render('ejs/practice',{title:'home',data:data,isLogin:req.session.isLoggedIn});
        }
    }
    catch(er){
        console.log('error occured');
        console.log(er)
    }
}
const getEasyProblem=async(req,res,next)=>{
    try{
        const data=await Easy.find().skip(0).limit(20);
        if(data!=null){
            res.render('ejs/practice',{title:'home',data:data,isLogin:req.session.isLoggedIn});
        }
    }
    catch(er){
        console.log('error occured');
        console.log(er)
    }
}
const getMediumProblem=async(req,res,next)=>{
    try{
        const data=await Medium.find().skip(0).limit(20);
        if(data!=null){
            res.render('ejs/practice',{title:'home',data:data,isLogin:req.session.isLoggedIn});
        }
    }
    catch(er){
        console.log('error occured');
        console.log(er)
    }
}
const getHardProblem=async(req,res,next)=>{
    try{
        const data=await Hard.find().skip(0).limit(20);
        if(data!=null){
            res.render('ejs/practice',{title:'home',data:data,isLogin:req.session.isLoggedIn});
        }
    }
    catch(er){
        console.log('error occured');
        console.log(er)
    }
}
const getLogout=(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/login');
    })
}
module.exports={getHome,getCompiler,getShare,getPractice,getEasyProblem,getMediumProblem,getHardProblem,getLogout};