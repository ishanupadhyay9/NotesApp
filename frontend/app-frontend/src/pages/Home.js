import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Notecard from '../components/Notecard'
import { MdAdd } from 'react-icons/md'
import AddNote from '../components/AddNote'
import ReactModal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utlis/axiosinstance'
import moment from 'moment'
import toast from 'react-hot-toast'
const Home = () => {
  const [openModal,setopenModal] = useState({
    isShown:false,
    type:"add",
    data:null,
  });
  const [userinfo,setUserinfo] = useState(null);
  const[allnote,setallnotes] = useState([]);
  const [issearch,setisearch] = useState(false);
  const navigate = useNavigate();
  const handleEdit = (notedetails)=>{
    setopenModal({isShown:true, data:notedetails, type:'edit' });
  }
  const getUserinfo = async ()=>{
    try{
      const response = await axiosInstance.get('/get-user');
      
      if(response && response.data )
      { 
        setUserinfo(response.data);
      }
    }
    catch(error)
    {
      if(error.response.status===401)
      {
        localStorage.clear();
        navigate('/login');
      }
    }
  };

  const getallnotes = async()=>{
    try{
      const response = await axiosInstance.get('/get-all');
     
      if(response.data && response.data.data){
    setallnotes(response.data.data);
    console.log(response.data.data);
      }
    }
    catch(error){
      console.log('error occured');
    }
  }
const deletenote = async(data)=>{
  try{
    const note = data?._id;
  const response = await axiosInstance.delete('delete-note/'+note)
  if(response.data){
    toast.success('note deleted successfully');
    getallnotes();
  
  }
  }
  catch(error){
    toast.error('please try again');
  console.log("error occured in editing");
  }
      }
      const onSearch = async(query)=>{
        try{
          const response = await axiosInstance.get('/search-notes',{
            params : {query},
          });
          if(response.data || response.data.notes){
            setisearch(true);
            setallnotes(response.data.notes);
          }
        }
        catch(error){
          console.log(error);
        }
      }
      const handleclearsearch = ()=>{
        setisearch(false);
        getallnotes();
      }
      const handleispinned= async(notedata)=>{
        try{
          const note = notedata?._id;
        const response = await axiosInstance.put('pinned/'+note,{isPinned: !notedata?.isPinned})
        if(response.data){
         
          getallnotes();

        
        }
        }
        catch(error){
          toast.error('please try again');
        console.log("error occured in pinning");
        }
            }
  useEffect(()=>{getallnotes();
    getUserinfo(); return()=>{};},[])
  return (
    <div>
      <Navbar userinfo={userinfo} onSearch={onSearch} handleclearsearch={handleclearsearch}/>
      <div className=' container mx-auto'>
    { allnote.length>0 ? <div className='grid grid-cols-3 gap-4 mt-8'>
      {allnote.map((item,ind)=>{
  return(
    <Notecard onPinNote={()=>{handleispinned(item)}} onDelete={()=>{deletenote(item)}} onEdit={()=>{handleEdit(item)}} key={item._id} title={item.title} date={ moment(item.createdOn).format('Do MMM YYYY')} isPinned={item.isPinned} content={item.content} tags={item.tags}/>

  )
      })}


      </div>:<div className=' w-full h-full  text-3xl flex justify-center items-center mt-7'>No notes </div>}
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
        <AddNote getallnote={getallnotes} type={openModal.type} 
        notedata={openModal.data} onClose={()=>{setopenModal({isShown:false,type:"add" ,data:null });}}/>
      </ReactModal>
      
     
    </div>
  )
}

export default Home
