import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Passwordbox from '../components/Passwordbox';
import { Link,useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { validateEmail } from '../utlis/help';
import axiosInstance from '../utlis/axiosinstance';
const Signupp = () => {
  const[name,setname] = useState("");
  const[email,setemail] = useState("");
  const[password,setpassword] = useState("");
  const[repass,setrepass]= useState("");
  const[error,seterror] = useState(null);
  const navigate = useNavigate();
  const handleSignUp = async(e)=>{
    e.preventDefault();
if(!name){
  seterror('please enter name');
  toast.error('Signup failed');
  return;
}
if(!email){
  seterror('please enter email');
  toast.error('Signup failed');
  return;
}
if(!validateEmail(email)){
  seterror("please enter a valid email address");
  toast.error('Signup failed');
}
if(!password){
  seterror('please enter password ');
  toast.error('Signup failed');
  return;
}
if(!repass){
  seterror('please confirm the password');
  toast.error('Signup failed');
  return;
}
if(repass!==password){
  seterror('passwords do not match');
  toast.error('Signup failed');
  return;
}
seterror("");

try{
  const response = await axiosInstance.post('/Signup',{name:name ,email:email,password:password});
  
  if(response && response.data && response.data.token){
   console.log(response.data.token);
   localStorage.setItem('token',response.data.token);
   toast.success('signup  successfull');
   navigate('/dashboard');
  }
  else {
 
   seterror("Invalid signup response from server");
   toast.error("signup error");
}
   }
   catch(e){
       if (e.response && e.response.data) {
           console.error('Error response from server:', e.response.data);

           const message = e.response.data.message || "An error occurred during Signup";
           seterror(message);
           toast.error(message);
       } else {
           seterror("Error in Signup");
           toast.error("Error in Signup");
       }
   }

  }
  return (
    <div className=' bg-gray-100 h-[100vh]'>
<div className='w-full h-20 bg-blue-500 text-center pt-4 text-3xl text-white'>NOTES</div>

      <div className='flex items-center justify-center mt-[60px] '>
      <div className='w-96 border rounded bg-white px-7 py-9 shadow-2xl'>
        <form onSubmit={handleSignUp} >
          <h4 className='text-2xl mb-7'>SignUp</h4>
          <input type="text" placeholder='Name' className='input-box'
          value={name} onChange={(e)=>setname(e.target.value)}/>
          <input type="text" placeholder='Email' className='input-box'
          value={email} onChange={(e)=>setemail(e.target.value)}/>
                  <Passwordbox value={password} onChange={(e)=>setpassword(e.target.value)}/>
                  <Passwordbox value={repass} placeholder={"Confirm Password"} onChange={(e)=>setrepass(e.target.value)}/>
                  {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
                  <button type='submit' className='btn-primary'>
            Create Account
        </button>
        <p className='text-sm text-center mt-4'>
            already have an account?{" "}
            <Link to="/Login" className="font-medium text-blue-500 underline">
                Login
            </Link>
        </p>
        </form>
      </div>

      </div>
    </div>
  )
}

export default Signupp
