import React, { useState } from 'react'
import Taginput from './Taginput'

const AddNote = () => {
    const [title,setTitle]= useState("");
    const  [content,setcontent]= useState("");
    const [tags,setTags]=useState([]);
  return (
    <div>
      <div className='flex flex-col gap-2'>
        <label className='input-label'>Tile</label>
        <input
        type='text'
        value={title}
        onChange={(e)=>{setTitle(e.target.value)}}
        className='text-2xl text-slate-950 outline-none'
        placeholder='temopp'
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
      </div>
      <Taginput tags={tags} setTags={setTags}/>
      <button className='btn-primary font-medium mt-5 p-3' onClick={()=>{}}>
        ADD
      </button>
    </div>
  )
}

export default AddNote
