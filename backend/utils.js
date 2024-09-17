const jwt = require('jsonwebtoken');
require("dotenv").config();
exports.authenticateToke =(req,res,next)=>{
    const token = req.header('authorization').replace("Bearer ","");
    console.log(token);
    if(!token) return res.status(401).json({message:"no token found"});
    try{
        const decode =  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        console.log(decode);
        req.user = decode;
        next();

    }
    catch(error){
        return res.status(400).json({
            error:true,
            message:'error in verificaltion',
            data:token
        })
    }

}