const mongoose = require('mongoose');
require('dotenv').config();
exports.dbonnect = async()=>{
    mongoose.connect(process.env.DATA_LINK,{

    })
    .then(()=>{
        console.log("db connected successfully")
    })
    .catch((err)=>{
        console.log("error in database connection");
        console.log(err);
        process.exit(1);
    })
}