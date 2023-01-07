const express=require('express');
const quote=require('../Schema/quotes');
const User=require('../Schema/login-signup');
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
    res.render('ejs/share',{title:'share',data:null,isLogin:req.session.isLoggedIn})
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
const getInbox=async(req,res,next)=>{
    const user=await User.findOne({email:req.session.email});
    res.render('ejs/share',{title:'share',data:user.array,isLogin:req.session.isLoggedIn})
}
const postDone=(req,res,next)=>{
    const id=req.body.id;
    console.log(typeof(id));
    console.log(id);
    User.findOne({email:req.session.email}).then((data)=>{
        data.done.push(id);
        data.done.sort();
        return data.save();
    }).then((data)=>{
        console.log(data);
        res.json({msg:'question solved successfully'});
    }).catch((er)=>{
        console.log('error')
        // console.log(er);
        res.json({msg:'error occured'});
    })
}
const postMail=async(req,res,next)=>{
    const {code,username}=req.body;
    try{
        const user1=await User.findOne({email:req.session.email});
    const user2=await User.findOne({username:username});
    if(!user1 || !user2 || (user1.array.length>=5 && user2.array.length>=5)){
        res.json({msg:'Failed : possible reasons Full mail inbox or invalid username'});
    }
    else{
        const code=req.body.code.trim();
        const toolDate=new Date();
        const date=`${toolDate.getDate()}/${toolDate.getMonth()+1}/${toolDate.getFullYear()}`;
        const time=`${toolDate.getHours()}:${toolDate.getMinutes()}:${toolDate.getSeconds()}`;
        const obj1={
            code:code,
            date:date,
            time:time,
            sentTo:user2.username,
            type:"sent"
        }
        const obj2={
            code:code,
            date:date,
            time:time,
            sentBy:user1.username,
            type:"received"
        }
        if(user1.array.length<5){
            user1.array.push(obj1);
            const result1=await user1.save();
        }
        if(user2.array.length<5){
            user2.array.push(obj2);
            const result2=await user2.save();
        }
        res.json({msg:'mail shared'})
    }
    }catch(er){
        console.log(er);

    }
}
module.exports={getHome,getCompiler,getShare,getPractice,getEasyProblem,getMediumProblem,getHardProblem,getLogout,getInbox,postDone,postMail};