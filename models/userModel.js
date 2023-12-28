const mongoose = require('mongoose')
const validator = require('validator') 
const bcrypt = require('bcryptjs')
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
       unique:true,
       validate(value){
        if(!validator.isEmail(value)) throw new error('invalid email password')
       },
    },
    password:{
        type:String,
        required:true,
    },
    conPassword:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:String,
        default:false,
    },
    followers:[{
        type:ObjectId,
        ref: 'USERS',
    }],
    followings:[{
      type:ObjectId,
      ref: 'USERS',
    }],
    photo:{
   type:String,
   default:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png',
    }, 
},{timestamps:true , versionKey:false});

userSchema.pre('save' , async function(next){
    try {
        if(this.isModified('password')){
            this.password = await bcrypt.hash(this.password , 9);
            this.conPassword = await bcrypt.hash(this.password , 9);
        }
        next();
    } catch (error) {
        console.log(error)
    }
})

const USER = new mongoose.model('USERS' , userSchema) ;

module.exports= USER ;