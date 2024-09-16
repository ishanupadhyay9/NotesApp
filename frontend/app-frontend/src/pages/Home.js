import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Notecard from '../components/Notecard'
import { MdAdd } from 'react-icons/md'
import AddNote from '../components/AddNote'
import ReactModal from 'react-modal'
const Home = () => {
  const [openModal,setopenModal] = useState({
    isShown:false,
    type:"add",
    data:null,
  });

  return (
    <div>
      <Navbar/>
      <div className=' container mx-auto'>
      <div className='grid grid-cols-3 gap-4 mt-8'>
      <Notecard title={"first title"} date={"date"} content={"dkdfnsdnskdvnsdkvnsd"} tags={"tags"}/>
      <Notecard title={"first title"} date={"date"} content={"dkdfnsdnskdvnsdkvnsd"} tags={"tags"}/>

      </div>
      </div>
      <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-700 absolute right-10 bottom-10' onClick={()=>{setopenModal({
        isShown: true, type:"add", data:null
      });}}>
        <MdAdd className='text-[32px] text-white'/>
      </button>
      <ReactModal
      isOpen={openModal.isShown}
      onRequestClose={()=>{}}
      stlye={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.2)",
        },
      }}
      contentLabel=""
      className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 border border-slate-300 shadow-xl  ">
        <AddNote/>
      </ReactModal>
      
     
    </div>
  )
}

export default Home
