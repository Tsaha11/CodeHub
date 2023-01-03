const express=require('express');
const router=express.Router();
const controller=require('../controller/pages');
router.get('/',controller.getCompiler);
router.get('/home',controller.getHome);
router.get('/compiler',controller.getCompiler);
router.get('/share',controller.getShare);
router.get('/practice',controller.getPractice);
module.exports=router;