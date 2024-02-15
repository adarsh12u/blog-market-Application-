
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { BsFillSendFill } from "react-icons/bs";
import { useMutation,  useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { customurl } from '../axios';
import { toast } from 'react-toastify';
const Commentcreate = ({userid , postid}) => {
  
   
    const {user} = useSelector((state)=>state.user);
    const[content , setcomment] = useState('');
    if(!user){
           return<div>
              <h1 className='text-lg md:text-4xl'>
                  you are not allow to comment in this post , firstly you have to login
              </h1>
           </div>
    }
 
    const query = useQueryClient();
    const {mutate : postcomment} = useMutation({
          mutationFn:async({userId , postId})=>{
                   await axios.post(`${customurl}comment/create`,{content, postId, userId })
          },
          onSuccess :(data, variables)=>{
            const postId = variables.postId;
              query.invalidateQueries({queryKey:[postId]  ,exact:true} )
              
              setcomment('')
              toast.success('comment sucessfully')
              
            },
            onError:(error)=>{
              toast.error("plese fill comment")
              console.log(error)
            }
          
    })   

  return (
    <>
  
   
     
       
  


   <div className=' flex justify-around gap-5 items-center
   '>
     
       
     
           <input minLength={5} maxLength={200} type="text" className=' w-full rounded-lg ' placeholder='write you comment here.......' required value={content} onChange={(e)=>setcomment(e.target.value)}/>
          
        <div>
        <BsFillSendFill color={'blue'} size={25}  onClick={()=>postcomment({userId : userid, postId :postid })}  className=' cursor-pointer'/>
        </div>
   </div>
    
       
        
     
      
          
 
         
    </>
  )
}

export default Commentcreate