const { response } = require("express");
const notes  = require("../models/motemodel");
exports.addnote = async(req,res)=>{
  
const {title,content,tags,pinned} = req.body;

const userid= req.user.id;
if(!title || !content )
{
    return res.status(400).json({
        success:false,
        message:"please provide complete information"
    });
}
try{
 const nn = await notes.create({title,content,tags:tags || [],isPinned:pinned||false, userId:userid});
 console.log(nn);
 return res.status(200).json({
    success:true,
    message:"note created",
    data:nn
 })
}
catch(error){
return res.status(500).json({
    message:"internal server error"
})
}
}
exports.editnote = async(req,res)=>{
   console.log("editing initiated");
    const noteid = req.params.noteId ;
    console.log(noteid);
    const {title , content, tags,isPinned} = req.body;
  
    const{user}= req.user.id;
    if(!title && !content && !tags ){
        return res.status(400).json({
            message:"no change provided"
        });

    }
    console.log(noteid);
    try{
        
    const note = await notes.findById(noteid);
    if(!note){
        return res.status(400).json({
            success:false,
            message:"error in the updation",
    
        })
    }
    console.log(note);
    if(title) note.title = title;
    if(content) note.content = content;
    if(tags) note.tags=tags;
    if(isPinned) note.isPinned = isPinned;
 console.log(note);
 const jj =await  notes.findOneAndReplace({_id:noteid},note);
   return res.status(200).json({
        success:true,
        message:"update successful",
        data:jj
    })
    }
catch(e){
    return res.status(500).json({
        success:false,
        message:"update failed"
    })
}

}
exports.getallnotes = async(req,res)=>{
    const userid= req.user.id;
    try{
        const allnotes = await notes.find({userId: userid}).sort({isPinned:-1});
        return res.status(200).json({
            success:true,
           data:allnotes
        })
    }
  catch(error)
  {
    return res.status(500).json({
        success:false,
        message:"server error"
    })
  }
}
exports.deleteNote = async(req,res)=>{
    const noteid = req.params.noteId;
    try{
        const op = await notes.findByIdAndDelete(noteid);
        return res.status(200).json({
            success:true,
            data:op
        })
    }
    catch (e){
        return res.status(500).json({
            success:false,
            message:"internal server error"
        });
    }

}
exports.updatepinned = async(req,res)=>{
   
    const noteid = req.params.noteId ;
    const {isPinned} = req.body;
  
    const{user}= req.user.id;
  
    console.log(noteid);
    try{
        
    const note = await notes.findById(noteid);
    if(!note){
        return res.status(400).json({
            success:false,
            message:"error in the updation",
    
        })
    }
    console.log(note);
     note.isPinned = isPinned;
 console.log(note);
 const jj =await  notes.findOneAndReplace({_id:noteid},note);
   return res.status(200).json({
        success:true,
        message:"update successful",
        data:jj
    })
    }
catch(e){
    return res.status(500).json({
        success:false,
        message:"update failed"
    })
}

}
exports.search = async(req,res)=>{
    const user= req.user.id;
    const{query}= req.query;
    if(!query)
    {
        return res.status(400).json({
            error:true,
            message:"search query is required"

        })
    }
    try{
  const matchingNotes = await notes.find({
    userId:user,
    $or: [
        {title : {$regex :new RegExp(query,'i')}},
        {content : {$regex :new RegExp(query,'i')}},
    ]
  });
  return res.json({
    error:false,
    notes:matchingNotes,
    message:"Notes found"
  })
    }
    catch(e){
        return res.status(500).json({
            error:true,
            message :"internal server Error",
        })
    }
}
