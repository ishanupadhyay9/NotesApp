const user  = require("../models/usermodel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
exports.signup = async(req,res)=>{
    try{
        const {name,email,password}= req.body;
     if(!name || !email || !password)
     {
        return res.status(400).json({
            success:false,
            message:"please fill complete information"
        })
     }
        const ch = await user.findOne({email});
        if(ch){
            return res.status(400).json(
                {
                    error:true,
                    body:"email already exist"
                }
            );
        }
        let pass1;
        try{
               pass1 = await bcrypt.hash(password,10);
        }
        catch(err){
           return res.status(500).json({
            error:true,
            message:"error in hashing password",
           });
        }
        const signup = await user.create({name,email,password:pass1});
        const payload ={
            id:signup._id,
            email:signup.email,
            name:signup.name

        }
  console.log(signup);
  const token = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{

  })
  console.log(token);
        return res.status(200).json({
            error:false,
            message:"user created successfully",
            email,
            token
        });
    }
    catch(error)
    { console.log(error);
        return res.status(500).json({
            error:true,
            message:"error in SIGNUP",
           });
    }
}



exports.login = async(req,res)=>{
    console.log('login attemp initiated');
    try{
      let {email,password}=req.body;
       if(!email || !password)
       { return res.status(500).json({
          error:true,
          message:"these fields can not be empty"
      });
  
       }
      let ch1 = await user.findOne({email});

      if(!ch1){
          return res.status(401).json({
              error:true,
              message:"No user exist with that email id"
          });
  
      }
     
    
     if(await bcrypt.compare(password,ch1.password))
     { 
        const payload ={
            id:ch1._id,
            email:ch1.email,
            name:ch1.name

        }
       let token = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{});
       console.log(token);
       ch1.token  = token;
       ch1.password = undefined;
   
    console.log(ch1);
       return res.json({
        error:false,
        message:'Logged in SuccessFully',
        email,
        token
       })
          
    
      }
     else{
      res.status(400).json({
       error:true,
        message:"password incorrect"
      });
     }
  
    }
    catch(error)
    {
      return res.status(500).json({
          error:'true',
          message:"Error in Login"
      })
    }
  
  }
  exports.getuser = async(req,res)=>{
    const userid = req.user.id;
   try{
    const isUser = await user.findById(userid);
    return res.json({
        data:isUser,
    })
   }
   catch(error)
   {
    return res.status(500).json({
        error:true,
        message:'error in finding user'
    })
   }

  }
  