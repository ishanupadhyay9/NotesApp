import React, { useEffect, useState } from 'react'
import ProfileInfo from './ProfileInfo'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import Searcbar from './Searcbar';

const Navbar = ({userinfo,onSearch,handleclearsearch}) => {
  
  const [searchText,setSearchText] = useState("");
  const onClearSearch = ()=>{
    setSearchText("");
  };
  const handleSearch = ()=>{
 if(searchText){
  onSearch(searchText)
 }
  };
  
  const navigate = useNavigate();
  const onLogout = ()=>{
    localStorage.clear();
    navigate('/login');
    toast.success("logged out successfully");
  };
  return (
    <div className='bg-blue-500 flex item-center  justify-between px-6 py-2 drop-shadow'>
   
    <h2 className='text-xl font-medium text-white   py-2'>NOTES</h2>
 <Searcbar  handleclearsearch={handleclearsearch} value={searchText} setval={setSearchText} handleSearch={handleSearch}/>
  <ProfileInfo onLogout={onLogout}  userinfo={userinfo} onClearSearch={onClearSearch} handleSearch={handleSearch}/>

    </div>
  )
}

export default Navbar
