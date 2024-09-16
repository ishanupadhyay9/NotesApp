import React, { useState } from 'react'
import { FaRegEye,FaRegEyeSlash } from 'react-icons/fa';

const Passwordbox = ({value,onChange, placeholder}) => {
    const [showpassword,setshowpassword]=useState(false);
    const toggleShowPassword = ()=>{
        setshowpassword(!showpassword);
    };
  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3'>
      <input 
      value={value} onChange={onChange} type={showpassword?"text":"password"}
      placeholder={placeholder || "Password"}
      className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'/>
    
    {
        showpassword?   <FaRegEye  size={22} className=' text-blue-500 cursor-pointer'
    onClick={()=>toggleShowPassword()} /> :   <FaRegEyeSlash  size={22} className=' text-gray-500 cursor-pointer'
    onClick={()=>toggleShowPassword()} />
    }
    </div>


  )
}

export default Passwordbox
