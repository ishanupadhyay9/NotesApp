const mongoose = require("mongoose");
const noteschema = new mongoose.Schema({
    title:{ type:String , required:true},
    content:{ type:String , required:true},
    tags:{type:[String], default:[]},
    isPinned:{type:Boolean , required:true },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true

    },
    createdOn: {type:Date , default: new Date().getDate()},
});
module.exports = mongoose.model('notes',noteschema);