import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import {Link, Navigate} from "react-router-dom"
import Passwordbox from '../components/Passwordbox'
import { validateEmail } from '../utlis/help'
import { toast } from 'react-hot-toast'
import axiosInstance from '../utlis/axiosinstance'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email,setemail]= useState("");
    const[password,setpassword]=useState("");
    const[error,seterror]=useState(null);
    const navigate=useNavigate();
    const handleLogin = async (event)=>{
        event.preventDefault();
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

        try{
       const response = await axiosInstance.post('/Login',{email:email,password:password});
       
       if(response && response.data && response.data.token){
        console.log(response.data.token);
        localStorage.setItem('token',response.data.token);
        toast.success('logged in successfully');
        navigate('/dashboard');
       }
       else {
      
        seterror("Invalid login response from server");
        toast.error("Invalid login response");
    }
        }
        catch(e){
            if (e.response && e.response.data) {
                console.error('Error response from server:', e.response.data);
    
                const message = e.response.data.message || "An error occurred during login";
                seterror(message);
                toast.error(message);
            } else {
                seterror("Error in Login");
                toast.error("Error in Login");
            }
        }
    }
  return (
   <div className='bg-gray-100 h-[100vh]'>
<div className='w-full h-20 bg-blue-500 text-center pt-5 text-3xl text-white'>NOTES</div>
<div className='flex item-centere justify-center mt-28 '>
    <div className='w-96  border bg-white px-7 py-10 shadow-2xl'>
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
