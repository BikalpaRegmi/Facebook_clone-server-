const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const User = require('../models/userModel')
const Post = require('../models/postSchema')

router.get('/user/:id' , async(req,res)=>{
    try {
        const id = req.params.id ;
        const userResult = await User.findOne({_id:id})  ; 
        res.json(userResult);

    } catch (error) {
        res.send(error)
    }
})

module.exports = router