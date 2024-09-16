import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import {Link} from "react-router-dom"
import Passwordbox from '../components/Passwordbox'
import { validateEmail } from '../utlis/help'
import { toast } from 'react-hot-toast'
const Login = () => {
    const [email,setemail]= useState("");
    const[password,setpassword]=useState("");
    const[error,seterror]=useState(null);
  
    const handleLogin = async (event)=>{
        
        if(!validateEmail(email)){
            seterror("Please enter a valid email address.");
           toast.error("login failed");
            return;
        }
        if(!password)
        {
            seterror("Please enter the password");
        
            return;
        }
        seterror("");
    }
  return (
    <div>
<Navbar/>
<div className='flex item-centere justify-center mt-28'>
    <div className='w-96  border bg-white px-7 py-10'>
    <form onSubmit={handleLogin}>
        <h4 className='text-2xl mb-7'>Login</h4>
        <input type='text' placeholder='Email' className='input-box' value={email} onChange={(e)=>{setemail(e.target.value)}}/>
        <Passwordbox value={password} onChange={(e)=>setpassword(e.target.value)}/>
        {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
        <button type='submit' className='btn-primary'>
            Login
        </button>
        <p className='text-sm text-center mt-4'>
            Not registered yet?{" "}
            <Link to="/SignUp" className="font-medium text-blue-500 underline">
                Create an account
            </Link>
        </p>
    </form>
    </div>
</div>
    </div>
  )
}

export default Login
