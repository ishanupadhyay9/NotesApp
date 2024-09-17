const mongoose = require('mongoose');
const user_schema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
       } ,
       email:{
        type:String,
        required:true,
        
       },
       password:{
        type:String,
        required:true
       },
       createdate:{
        type:Date,
        default: new Date()
       }
})
module.exports=mongoose.model('User',user_schema);