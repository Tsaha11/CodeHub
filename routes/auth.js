//routes
const express = require("express");
const router = express.Router();
const controller = require("../controller/auth");
const { check, body } = require("express-validator/check");
router.get("/login", controller.getLogin);
router.get("/signup", controller.getSignup);
router.post("/login", controller.postLogin);
router.post("/signup", [check("email").isEmail(),body('password').isLength({min:5}),body('confirmpassword').isLength({min:5},body('confirmpassword').custom((value,{req})=>{
    if(value!==req.body.password){
        return false;
    }
    return true;
}))], controller.postSignup);
module.exports = router;
