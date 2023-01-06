//controller
const express=require('express');
const { use } = require('../routes/auth');
const User=require('../Schema/login-signup');
const bcrypt=require('bcrypt');
const {validationResult}=require('express-validator/check');
const getLogin=(req,res,next)=>{
    res.render('login-signup/ejs/login',{title:'Login',error:req.flash('error'),pop:req.flash('pop')});// popup alert
}
const getSignup=(req,res,next)=>{
    res.render('login-signup/ejs/signup',{title:'Sign-Up',error:req.flash('error')})
}
const postSignup=async(req,res,next)=>{
    const errors=validationResult(req);
    if(errors.isEmpty()==false){
        req.flash('error','password should be more than 5 character and email and username should be valid');
        return res.render('login-signup/ejs/signup',{title:'Sign-Up',error:req.flash('error')})
    }
    try{
        const {username,email,password,confirmpassword}=req.body;
        const userUnique=await User.find({username:username});
        const emailUnique=await User.find({email:email});
        if(password!=confirmpassword){
            req.flash('error','Password and confirm password not matched');;
            res.render('login-signup/ejs/signup',{title:'Sign-Up',error:req.flash('error')});
        }
        if(userUnique.length==0 && emailUnique.length==0){
            const hashpw=await bcrypt.hash(password,10);
            // email verification
            const arr=[];
            const user=new User({
                username:username,
                email:email,
                password:hashpw,
                array:arr
            }).save().then((result)=>{
                console.log('data created');
                req.flash('pop','show karo ji');
                res.redirect('/login');
            }).catch(er=>{
                console.log(er);
                console.log('error occured');
            })
        }
        else{
            req.flash('error','username or email already exist');
            res.render('login-signup/ejs/signup',{title:'Sign-Up',error:req.flash('error')});
        }
    }
    catch(er){
        console.log(er);
        res.send('Something went wrong');
        // error handling
    }
}
const postLogin=async(req,res,next)=>{
    const {email,password}=req.body;
    const errors=validationResult(req);
    if(errors.isEmpty()==false){
        req.flash('error','Email not valid');
        return res.render('login-signup/ejs/login',{title:'Login-Up',error:req.flash('error')})
    }
    try{
        const user=await User.find({email:email});
        if(user.length==0){
            // if email not found
            console.log('e');
            req.flash('error','Email does not exist');
            return res.render('login-signup/ejs/login',{title:'Login-Up',error:req.flash('error')})
        }
        const passCheck=await bcrypt.compare(password,user[0].password);
        if(passCheck==true){
            req.session.isLoggedIn=true;
            req.session.email=email;
            res.redirect('/');
        }
        else{
            req.flash('error','password not matched')
            res.redirect('/login');
        }
    }
    catch(er){
        console.log(er);
    }
}
module.exports={getLogin,getSignup,postLogin,postSignup}