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
       const result = await Post.find().populate('postedBy' , '_id name').populate('comments.postedBy', '_id name');
       res.json(result) ;
   } catch (error) {
      res.json(error)
   }
})

//for getting posts by individual persons
router.route('/mypost').get(authentication , async(req,res)=>{
   try {
      const result = await Post.find({ postedBy : req.user._id}).populate('postedBy' , '_id name').populate('comments.postedBy', '_id name')
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
   ).populate('likes')
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
router.route('/comment').patch(authentication , async(req,res)=>{
   try {
      const comment = {
         comment : req.body.comment ,
         postedBy : req.user._id,
      }
      const result = await Post.findByIdAndUpdate(req.body.postId , {
         $push : {comments : comment}
      } , {new:true})
      res.json(result) ;
   } catch (error) {
      res.send(error)
   }
})

//for deleting post
router.route('/deletePost/:id').delete(async(req,res)=>{
try {
   const {id} = req.params ;
   const deletePost = await Post.findByIdAndDelete({_id:id}) ;
   res.json(deletePost) ;
} catch (error) {
   res.send(error)
}}
)

module.exports = router