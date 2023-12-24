const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const USER = require('./userModel')

const postSchema =new mongoose.Schema({
   caption:{
    type:String,  
    default:'added a post'  
   },
   picture:{
    type:String,
    default:'no Photo'
   },
   likes:[{
     type:ObjectId,
     ref:USER,
   }],
   comments:[{
    comment:{type:String},
    postedBy:{type:ObjectId , ref:USER},
   }],
   postedBy:{
    type:ObjectId,
    ref:USER
   }
},{timestamps:true , versionKey:false})

const Post = new mongoose.model('POST' , postSchema)

module.exports = Post ;