import React from 'react'
import { getInitials } from '../utlis/help'

const ProfileInfo = ({onLogout}) => {
  return (
    <div className='flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font medium bg-slate-100'>{getInitials("Ishan Upadhyay")}</div>
<div>
<p className='text-sm font-medium'>Ishan</p>
<button className='text-sm text-slate-700 underline' onClik={onLogout}>Logout</button>
</div>
        </div>

   


  )
}

export default ProfileInfo
