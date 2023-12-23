const express = require('express')
const router = express.Router();
const authentication = require('../middleware/authentication');
const Post = require('../models/postSchema');


//for creating posts
router.route('/createpost').post( authentication, async(req,res)=>{
 try {
     const {caption , picture} = req.body ;
 
  const post = new Post({ caption , picture , postedBy:req.user })
  await post.save()
  res.json('post added')

 } catch (error) {
    res.send(error) ;
 }
}) ;

//for getting all posts
router.route('/getallpost').get(async(req,res)=>{
   try {
       const result = await Post.find().populate('postedBy') ;
       res.json(result) ;
   } catch (error) {
      res.json(error)
   }
})

module.exports = router