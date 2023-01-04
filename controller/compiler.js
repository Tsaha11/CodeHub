const express=require('express');
const request=require('request');
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
module.exports={getCodeText};