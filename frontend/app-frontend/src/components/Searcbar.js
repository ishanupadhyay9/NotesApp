import React from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';

const Searcbar = ({value , setval , handleSearch }) => {
  return (
    <div className='w-80 flex items-center  justify-center px-4 bg-slate-100 rounded-md '>
     <input 
     type="text" 
     placeholder='search notes'
     className='w-full text-xs bg-transparent py-[11px] outlint none'
     value = {value}
     onChange={(event)=>{
        setval(event.target.value);
     }}/>
    <div>
    {value && <IoMdClose className='text-xl text-slate-500 cursor-pointer hover:text-black mr-3  ' onClick={()=>{setval("");}}/>
    }
     <FaMagnifyingGlass className='text-slate-400 cursor-pointer hover:text-black' onClick={handleSearch}/>
    </div>
    </div>
  )
}

export default Searcbar
