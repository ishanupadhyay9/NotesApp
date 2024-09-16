import React from 'react'
import Navbar from '../components/Navbar'
import {Link} from "react-router-dom"
import Passwordbox from '../components/Passwordbox'
const Login = () => {
  return (
    <div>
<Navbar/>
<div className='flex item-centere justify-center mt-28'>
    <div className='w-96  border bg-white px-7 py-10'>
    <form onSubmit={()=>{}}>
        <h4 className='text-2xl mb-7'>Login</h4>
        <input type='text' placeholder='Email' className='input-box'/>
        <Passwordbox/>
        <button type='submit' className='btn-primary'>
            Login
        </button>
        <p className='text-sm text-center mt-4'>
            Not registered yet?{" "}
            <Link to="/SignUp" className="font-medium text-prmiary underline">
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
