const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const User = require('../models/userModel')
const Post = require('../models/postSchema')
const authentication = require('../middleware/authentication')
//to get details about user
router.get('/user/:id' , async(req,res)=>{
    try {
        const id = req.params.id ;
        const userResult = await User.findOne({_id:id}).populate('followings' , '_id name photo')  ; 
        res.json(userResult);
    } catch (error) {
        res.send(error)
    }
})

//to get followers data
router.get('/followers/:id' , async(req,res)=>{
    try {
        const id = req.params.id ;
        const userResult = await User.findOne({_id:id}).populate('followers' , '_id name photo')  ; 
        res.json(userResult);
    } catch (error) {
        res.send(error)
    }
})

//to follow and add to own following a user
router.patch('/follow' , authentication , async(req,res)=>{
    try {
        const id = req.body.userFollowId ;
        const result = await User.findByIdAndUpdate({_id:id} , {
            $push : {followers : req.user._id}
        } , {new:true}) ;

        const result2 = await User.findByIdAndUpdate({_id:req.user._id} , {
            $push : {followings : id}
        } , {new:true}) ;

        res.json({result,result2}) ;

    } catch (error) {
        res.send(error)
    }
})

//to unfollow and remove to own following a user
router.patch('/unfollow' , authentication , async(req,res)=>{
    try {
        const id = req.body.userFollowId ;
        const result = await User.findByIdAndUpdate({_id:id} , {
            $pull : {followers : req.user._id}
        } , {new:true}) ;

        const result2 = await User.findByIdAndUpdate({_id:req.user._id} , {
            $pull : {followings : id}
        } , {new:true}) ;

        res.json({result,result2}) ;

    } catch (error) {
        res.send(error)
    }
})

//to upload profile picture
router.route('/uploadPP').patch( authentication , async(req,res)=>{
   try {
    const photo = req.body.pic ;
     const result = await User.findByIdAndUpdate({_id:req.user._id} , {
        $set : {photo:photo} ,
     } , {new:true}) ;

     res.json(result) ;

   } catch (error) {
    res.send(error)
   }
})
module.exports = router