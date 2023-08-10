const express = require("express");

const router = express.Router()
const User=require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt= require("jsonwebtoken");
const jwtsecret = "MynameisEndtoEndYouTubeChannel1$#"

router.post("/createuser",[body('email').isEmail(),body('password').isLength({min:5}),body('name').isLength({min:5})],async(req,res)=>{
    
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    
    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password,salt);

    try {
    await    User.create({
            name:req.body.name,
            password:securePassword,
            email:req.body.email,
            location:req.body.location
        })
        res.json({success:"true"});
    } catch (error) {
        console.log(error)
        res.json({success:"false"});
    }
})

router.post("/loginuser",[body('email').isEmail(),body('password').isLength({min:5})],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    } 
    let email = req.body.email;
    try{
        let userData = await User.findOne({email});    
        if(!userData)
        {
            return res.status(400).json({errors:"Enter valid Details "});
        }
        const pwdcompare = bcrypt.compare(req.body.password,userData.password)
        if(!pwdcompare)
        {
            return res.status(400).json({errors:"password not match"});
        }
        const data={
            user:{
                id:userData.id
            }
        }
        const authtoken = jwt.sign(data,jwtsecret)
        return res.json({success:true,authtoken:authtoken})
    }
    catch (error) {
        console.log(error)
        res.json({success:"false"});
    }
})

module.exports = router;
