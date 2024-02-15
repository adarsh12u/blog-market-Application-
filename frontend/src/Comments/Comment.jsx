import React, { useEffect, useState } from 'react'
import { customurl } from '../axios'
import axios from 'axios'
import moment from 'moment';import { CiHeart } from "react-icons/ci";
import { useSelector } from 'react-redux';
import {  useMutation, useQueryClient } from '@tanstack/react-query';
import { FaHeart } from "react-icons/fa6";
import { toast } from 'react-toastify';
const Comment = ({comment }) => {
 const [data , setdata] = useState('')

 const {user} = useSelector((state)=>state.user);
    useEffect(()=>{
       axios.get(`${customurl}user/${comment.userId}`).then((res)=>{

            setdata(res.data)
        }).catch(()=>{

        })
    },[comment])
const query = useQueryClient()
    const {mutate : handlelike} = useMutation({
        mutationFn:async({userid , commentId})=>{
                     await axios.post(`${customurl}comment/likes`,{userid , commentId})
        },  
        onSuccess:(data, variables)=>{
            const postId = variables.postid
            query.invalidateQueries({
                  queryKey:[postId],
                  exact:true
            })
        },
        onError:(error)=>{
                toast.error(error)
        }
    
 
    })

    const {mutate: deleteComment} = useMutation({
           mutationFn:async({userId , commentId , isAdmin})=>{
                
                    await axios.delete(`${customurl}comment/deletecomment/${isAdmin}/${commentId}/${userId}`)

           },
           onSuccess:(data,variable)=>{
                      const postId = variable.postid
                      query.invalidateQueries({queryKey:[postId] , exact:true})
                      toast.success("delete sucessfully")
           },
           onError:(error)=>{
                toast.error(error)
           }
    })
    return (
        <>
    <div className='w-full  overflow-auto p-5 flex justify-between gap-5  bg-gray-100 rounded-lg'>
<div className=' flex gap-5'>

 <div>
          <img className=' rounded-full h-8 w-10' src={data.profilePicture} alt="" />
    </div>
    <div className=' overflow-hidden w-full'>

                <h1 className=' text-xs  truncate '>{data.username}</h1>
                <h1>
                     {comment.content}
                </h1>
<div className=' flex gap-2 items-center border-t border-gray-300 mt-2'>
<div className=' flex gap-1 cursor-pointer mt-1' >

{
    comment.likes.includes(user._id) ?<FaHeart className=' mt-1  ' size={17} color='red'  onClick={()=>handlelike({userid:user._id ,commentId: comment._id , postid : comment.postId})}/>
    :  <CiHeart className=' mt-1  ' size={17}   color={`${comment.likes.includes(user._id) ? 'red' : ''}`}  onClick={()=>handlelike({userid:user._id ,commentId: comment._id , postid : comment.postId})}/>
    
}
<h1 className=' text-gray-500 text-sm'>{comment.numberOfLikes} like</h1>

    </div>
<h1 className=' text-red-700 text-sm font-medium cursor-pointer' onClick={()=>deleteComment({userId:user._id , commentId : comment._id  , postid : comment.postId, isAdmin : user.isAdmin})}>Delete comment </h1>
</div>

    </div>
</div>

      
<div className=' text-end'>
      <span className='  text-sm '>{moment(comment.createdAt).fromNow()}</span>
</div>

    </div>
        </>
    
  )
}

export default Comment