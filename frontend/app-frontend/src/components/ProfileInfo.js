import React from 'react'
import { getInitials } from '../utlis/help'

const ProfileInfo = ({onLogout,userinfo}) => {

  const obj = {...userinfo?.data};
 
  return (
    <div className='flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font medium bg-slate-100'>{getInitials(userinfo?.data?.name)}</div>
<div>
<p className='text-sm font-medium'>{obj?.name}</p>
<button className='text-sm text-slate-700 underline' onClick={onLogout}>Logout</button>
</div>
        </div>

   


  )
}

export default ProfileInfo
