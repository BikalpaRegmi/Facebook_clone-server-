const mongoose = require('mongoose')
const validator = require('validator') 
const bcrypt = require('bcryptjs')

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
    friends:{
        type:Array,
        default:[],
    }
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