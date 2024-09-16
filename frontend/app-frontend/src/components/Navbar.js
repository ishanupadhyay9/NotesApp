import React, { useState } from 'react'
import ProfileInfo from './ProfileInfo'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import Searcbar from './Searcbar';

const Navbar = () => {
  const [searchText,setSearchText] = useState("");
  const onClearSearch = ()=>{
    setSearchText("");
  };
  const handleSearch = ()=>{

  };
  const navigate = useNavigate;
  const onLogout = ()=>{
    navigate('/login');
    toast.success("logged out successfully");
  };
  return (
    <div className='bg-white flex item-center  justify-between px-6 py-2 drop-shadow'>
   
    <h2 className='text-xl font-medium text-black  py-2'>Notes</h2>
 <Searcbar value={searchText} setval={setSearchText} handleSearch={handleSearch}/>
  <ProfileInfo onLogout={onLogout} onClearSearch={onClearSearch} handleSearch={handleSearch}/>

    </div>
  )
}

export default Navbar
