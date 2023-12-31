const express = require('express')
const router = express.Router();
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//for registeration
router.route('/register').post(async(req,res)=>{
try {
    const user = new User(req.body);
 const userExists = await User.findOne({email:user.email});
 if(userExists) res.json({error:'email already exists'});
 
 else if(user.password !== user.conPassword) res.json({error:`password didn't matched`});
 
 else {
    await user.save();
    res.json('account registered sucessfully')
 } 
} catch (error) {
   res.json(error) 
}
})

//for signIn
router.route('/signin').post(async(req,res)=>{
    try {
        const user =new User(req.body);
        const userExists = await User.findOne({email:user.email});
        if(!userExists) res.json({error:'email not found plz register'})
        else{
           const isPassMatched = await bcrypt.compare(user.password , userExists.password);
           if(!isPassMatched) res.json({error:'Password didnt matched'})
           else{
        const token = jwt.sign({_id:userExists._id} , process.env.jwtKey)
         res.json({token , userExists})  ;          
         console.log({token , userExists})  ;          
        }
        }
    } catch (error) {
        res.json(error);
    }
})



module.exports = router ;