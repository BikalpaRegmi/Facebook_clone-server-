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
       const result = await Post.find().populate('postedBy' , '_id name') ;
       res.json(result) ;
   } catch (error) {
      res.json(error)
   }
})

//for getting posts by individual persons
router.route('/mypost').get(authentication , async(req,res)=>{
   try {
      const result = await Post.find({ postedBy : req.user._id}).populate('postedBy' , '_id name')
      res.json(result)
   } catch (error) {
      res.send(error)
   }
})

//for Likes 
router.route('/likes').patch(authentication , async(req,res)=>{
   try {
   const result =  await Post.findByIdAndUpdate(req.body.postId , {
      $push : { likes : req.user._id} 
      },{new:true}
   )
   res.json(result)
   } catch (error) {
      res.send(error)
   }
})

//for unLike
router.route('/unlike').patch(authentication , async(req,res)=>{
   try {
   const result =    await Post.findByIdAndUpdate(req.body.postId , {
      $pull : {likes : req.user._id} 
      },{new:true}
   )
    res.json(result)
   } catch (error) {
      res.send(error)
   }
})
//for comments
router.route('/comment').patch()

module.exports = router