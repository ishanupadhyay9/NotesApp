import React from 'react'
import { MdAdd, MdClose } from 'react-icons/md'
import { useState } from 'react';
const Taginput = ({tags,setTags}) => {
    const [ inputval ,setinputval] = useState("");
    const handleInputChange =(e)=>{
        setinputval(e.target.value);
    }
  
    const addTag = ()=>{
        if(inputval.trim() !== ""){
            setTags([...tags,inputval.trim()]);
            setinputval("");
           
        }
    };
    const handleKeyDown = (e)=>{
        if(e.key ==='Enter')
        {
            addTag();
        }

    };
    const handleremove = (tagr)=>{
    setTags(tags.filter((tag)=>tag !== tagr ));
  
    };
  return (
    <div>

    
    { tags?.length >0 &&
        (
            <div className='flex items-center gap-2 flex-wrap mt-2'>
        {tags.map((tag,ind)=>{{console.log(tag);}
           return( <span key={ind} className='flex item-center justify-center  gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded'>
                #{tag}
                <button onClick={()=>{handleremove(tag)}}>
                <MdClose className=''/>
                </button>
            </span>);
          
        })}
    </div>
        )
    }
     <div className='flex items-center gap-4 mt-3'>
        <input type="text" className='text-sm bg-transparent border px-3 py-2 rounded outline-none ' placeholder='Add tags' onChange={handleInputChange} onKeyDown={handleKeyDown} value={inputval}/>
        <button className='w-8 h-8 flex item-center justify-center rounded border border-blue-700 hover:bg-blue-700' onClick={()=>{addTag()}} >
            <MdAdd className='text-2xl my-auto text-blue-700 hover:text-white'/>
        </button>
     </div> 
    </div>
  )
}

export default Taginput
