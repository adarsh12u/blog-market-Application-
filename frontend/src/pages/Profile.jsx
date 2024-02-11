import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Button } from 'flowbite-react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { customurl } from '../axios';
import { toast } from 'react-toastify';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { deleteuser, signout } from '../user/userslice';

const Profile = () => {
   const navigate  = useNavigate();
  const {user} = useSelector((state)=>state.user);
  const[username,setusername] = useState(user.username);
  const[visible , setvisible] = useState(true)
  const [password , setpassword] = useState('')
  const [email , setemail] = useState(user.email)
  const [showmodal , setShowModal] = useState(false)
   
  const dispatch = useDispatch();
  const handlesignout =async ()=>{
    await axios.post(`${customurl}user/signout`,{
      headers:{
        "Content-Type":'application/json'
      }
    }).then((res)=>{
      dispatch(signout());
      
          toast.success("signout sucessfully")
     }).catch((err)=>{
      
      
    
        toast.error(err.response.data.message)
     })
  }
  const handleDeleteUser = async() =>{
    await axios.delete(`${customurl}user/delete/${user._id}`,{
      headers:{
        "Content-Type":'application/json'
      }
    }).then((res)=>{
      dispatch(deleteuser());
      setShowModal(false)
          toast.success("Delete sucessfully")
     }).catch((err)=>{
      
      setShowModal(false)
    
        toast.error(err.response.data.message)
     })
  }
const handlesubmit = async(e)=>{
        e.preventDefault();
   
  await axios.put(`${customurl}user/update/${user._id}`,{username , password , email},{
    headers:{
      "Content-Type":'application/json'
    }
  }).then((res)=>{
        toast.success("Update sucessfully")
   }).catch((err)=>{
    console.log(err)
      toast.error(err.response.data.message)
   })

}
  return (
    <>
    <div className=' w-[373px] md:w-[385px]  mx-auto mt-5 mb-10  '>  
        
              <h1 className=' text-center mb-5 text-xl lg:text-2xl font-semibold'>Profile</h1>
               <form action="" onSubmit={handlesubmit}>
           <div className=' flex flex-col gap-5 w-full lg:mt-16  ' >

                    
                         <div className='  gap-1  flex flex-col'>
                              <label  className='  text-base font-medium'  htmlFor="name">username :</label>
                              <input type="text" onChange={(e)=>setusername(e.target.value)}   value={username} className=' w-[23rem] md:w-96   p-2 bg-gray-100    rounded-lg'   />
                         </div>
                         <div className=' flex   gap-1 flex-col'>
                         <label  className='  text-base font-medium' htmlFor="password">password :</label>
                         <div className=' relative'>

                              <input type={visible ? "text" : "password"} onChange={(e)=>setpassword(e.target.value)}   value={password} className='bg-gray-100 w-[23rem] md:w-96 p-2  rounded-lg' />
                              
                                        {
                                            visible ? (
                                             <AiOutlineEye
                                             size={25}
                                             className=" cursor-pointer absolute right-4 top-2"
                                             onClick={() => setvisible(false)}
                                             />
                                             ) : (
                                               <AiOutlineEyeInvisible
                                                  size={25}
                                                  className=" cursor-pointer  absolute right-4 top-2"
                                                  onClick={() => setvisible(true)}
                                                  />
                                                  )
                                                }
                                        </div>
                         </div>
                         <div className=' flex  gap-1  flex-col'> 
                         <label  className='  text-base font-medium' htmlFor="name">email :</label>
                              <input type="email"   onChange={(e)=>setemail(e.target.value)} value={email} className='bg-gray-100 w-[23rem] md:w-96 p-2  rounded-lg'  />
                         </div>
                     
                     <div className=' w-full mt-3 space-y-4'>
                     <Button className=" w-[23rem] md:w-96" type="submit" gradientDuoTone={"purpleToBlue"}   outline>Update </Button>
         {
          user.isAdmin &&    <button className=" w-[23rem] bg-black text-white p-2 rounded-lg md:w-96" type="submit" onClick={ ()=>navigate('/create-post ')} gradientDuoTone={"purpleToPink"}   >Create Post </button>
         
         }
                     </div>
           </div>
               </form>
               <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={() => setShowModal(true)} className='cursor-pointer'>
          Delete Account
        </span>
        <span onClick={handlesignout} className='cursor-pointer'>
          Sign Out
        </span>
      </div>

  
        
    </div>
    {
      showmodal && <div className=' h-auto top-1/2  left-1/3  bg-gray-100 rounded-lg absolute  p-3 '> 
            <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button gradientDuoTone={"purpleToBlue"} onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </div>
  
    }
  
                                                </>
  )
}

export default Profile


