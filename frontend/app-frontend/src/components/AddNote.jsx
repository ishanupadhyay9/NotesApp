import React, { useState } from 'react'
import Taginput from './Taginput'
import { MdClose } from 'react-icons/md';
import toast from 'react-hot-toast';
import axiosInstance from '../utlis/axiosinstance';

const AddNote = ({notedata,type,onClose,getallnote}) => {
    const [title,setTitle]= useState(notedata?.title || "");
    const  [content,setcontent]= useState(notedata?.content || "");
    const [tags,setTags]=useState(notedata?.tags || []);
    const addnewNote = async()=>{
try{
const response = await axiosInstance.post('add-note',{
  title,
  content,
  tags,
})
if(response.data){
  toast.success('note added successfully');
  getallnote();
  onClose();

}
}
catch(error){
  toast.error('please try again');
console.log("error occured in adding");
}
    }
    const editNote = async()=>{
      try{
        const note = notedata?._id;
      const response = await axiosInstance.put('edit-note/'+note,{
        title,
        content,
        tags,
      })
      if(response.data){
        toast.success('note edited successfully');
        getallnote();
        onClose();
      
      }
      }
      catch(error){
        toast.error('please try again');
      console.log("error occured in editing");
      }
          }
   const[error,seterror]=useState(null);
  const handleaddnote =()=>{
  if(!title){
    seterror("please enter the title");
    toast.error("failed to create a note");
    return;
  }
  if(!content){
    seterror("please enter the content");
    toast.error("falied to create a note");
    return;
  }
  seterror("");
  if(type === 'edit')
  {
    editNote();
  }
  else{
    addnewNote();
  }
  };
  return (
    <div className='relative'>
    <button className='w-10 h-10  text-black rounded-full flex items-center justify-center absolute top-0 right-0 hover:bg-red-600 hover:text-white' onClick={onClose}>
      <MdClose className='text-xl'/>
    </button>
      <div className='flex flex-col gap-2'>
        <label className='input-label'>Tile</label>
        <input
        type='text'
        value={title}
        onChange={(e)=>{setTitle(e.target.value)}}
        className='text-2xl text-slate-950 outline-none'
        placeholder='title'
        />

      </div>
      <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label'>CONTENT</label>
        <textarea 
    value={content}
    onChange={(e)=>{setcontent(e.target.value)}}
         className='text-sm text-slate-950 outline outline-1 bg-slate-50 p-2 rounded'
         placeholder='content'
            rows={10}
         />

      </div>
      <div className='mt-3'>
        <label className='input-label'>TAGS</label>
        <Taginput tags={tags} setTags={setTags}/>
      </div>
   {error && <div  className='text-red-500 text-xs pt-4'>{error}</div>}
    
      <button className='btn-primary font-medium mt-5 p-3' onClick={handleaddnote}>
        {type==='edit'?'UPDATE':'ADD'}
      </button>
    </div>
  )
}

export default AddNote
