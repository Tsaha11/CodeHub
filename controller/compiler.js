const { compareSync } = require('bcrypt');
const { response } = require('express');
const express=require('express');
const request=require('request');
const User=require('../Schema/login-signup');
const getCodeText=(req,res,next)=>{
    const codeText=req.body.codeText;
    const lang=req.body.lang;
    const stdin=req.body.stdin;
    console.log(stdin);
    console.log(lang);
    const body={
        clientId: "1b81d7d2dfcc83475f0c9dcf87c63260",
        clientSecret:"2296d646ee12e65b4362d99171eeff24611b75e6b2060a80199be47e365f7810",
        versionIndex: "3",
        language:lang,
        stdin:stdin,
        script:codeText,
    }
    request({
        url: 'https://api.jdoodle.com/v1/execute',
        method: "POST",
        json: body
    },
    function (error, response, body) {
        res.json({error:error,statusCode:response,body:body})
    })
}
const postSave=(req,res,next)=>{
    User.findOneAndUpdate({email:req.session.email}).then((result)=>{
        const arrLenght=result.array.length;
        var msg='';
        if(arrLenght>=5){
            msg='Inbox fully loaded clear your inbox';
            res.json({msg:msg});
        }
        else{
            const code=req.body.code.trim();
            const toolDate=new Date();
            const date=`${toolDate.getDate()}/${toolDate.getMonth()+1}/${toolDate.getFullYear()}`;
            const time=`${toolDate.getHours()}:${toolDate.getMinutes()}:${toolDate.getSeconds()}`;
            const obj={
                code:code,
                date:date,
                time:time,
                sentBy:"self",
                type:"saved"
            }
            result.array.push(obj);
            return result.save();
        }
    }).then((result)=>{
        msg='Code added successfully';
        console.log(result);
        res.json({msg:msg});
    })
    .catch(er=>{
        console.log(er);
    })
}
module.exports={getCodeText,postSave};