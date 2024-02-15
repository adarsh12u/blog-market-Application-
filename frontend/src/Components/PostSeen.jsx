import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { customurl } from '../axios';
import {Viewer , Worker} from '@react-pdf-viewer/core'
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { ImCross } from "react-icons/im";
import { Button, Spinner } from 'flowbite-react';
import Commentcreate from '../Comments/Commentcreate';
import ShowComment from '../Comments/ShowComment';
const PostSeen = () => {
  const {slug} = useParams();
  const {data , isLoading} = useQuery({
       queryKey:['slug',slug || 'all'],
       queryFn:async ()=>{
             const {data} =await axios.get(`${customurl}post/getpost?slug=${slug}`) 
             return data;
       }
  })

  const newplugin = defaultLayoutPlugin();
  const [pdf , setshowpdf] = useState(false);
    if(isLoading){
       return <div className='flex justify-center items-center min-h-screen'>
   
        <Spinner size={'xl'}/>

       </div>
    }
    return (
    <div className={` mb-40  h-full w-full relative top-0 right-0`}>
      
      <div className=' p-2 flex flex-col w-[100%] items-center gap-10 md:w-[70%] m-auto'>
  <div className=' p-2  md:pl-14 md:pr-14 text-center'>
     
       <h1 className=' text-5xl mt-10 font-serif '>
         {data.posts[0].title}
        
       </h1>
  </div>
      
        <Button size={'md'} color='gray' pill>
            {data && data.posts[0].category}
          </Button> 
      
       <div className=' cursor-pointer' >
        {
          console.log("1") ||
          data.posts[0].file.includes('pdf') && <img  onClick={()=>setshowpdf(true)} className=' w-full  md:w-[50rem] md:h-[28rem]'  src='https://fossbytes.com/wp-content/uploads/2017/04/pdf-readers-best-640x360.jpg' />
        } { 
          console.log("1") || data.posts[0].file.includes('.txt') && <Link to={data.posts[0].file} >
          
          <img className=' w-full  md:w-[50rem] md:h-[28rem]'  src='https://techtipsnreview.com/wp-content/uploads/2020/09/What-is-a-txt-file-How-to-open-txt-file.jpg' />
          </Link>
          
        }
        {
          
          console.log("1") ||
            !data.posts[0].file.includes('pdf') && !data.posts[0].file.includes('txt') && <img className=' w-full  md:w-[50rem] md:h-[28rem]'   src={data.posts[0].file} />
            
            
          }
          </div>
          <div className='flex justify-center p-3  w-full max-w-2xl text-md'>
        <span className=' border-b border-black'>Created At : {data && new Date(data.posts[0].createdAt).toLocaleDateString()}</span>
       
      </div>
  


 <div className='post w-full max-w-2xl' dangerouslySetInnerHTML={{__html:data && data.posts[0].content}}>
     
 </div>
       
       
       
    

      
<div>
      
</div>
     
     
      

    <h1 className=' mb-3 text-xl font-semibold'>
       Comments
    </h1>
      <div className=' w-full md:w-[90%] border border-gray-500 rounded-md p-3  md:p-10'>
          
           <Commentcreate userid = {data.posts[0].userId}  postid={data.posts[0]._id} />
      </div>
      <div className='  w-full md:w-[90%]  rounded-md    '>
          <ShowComment postId={data.posts[0]._id} />
      </div>
     
       </div>

{
  pdf && <div className='   top-10 bg-white  h-[90vh]   container  z-50   w-screen  md:h-[40rem] md:w-[40rem] object-cover '>
  <div onClick={()=>setshowpdf(false)} className=' cursor-pointer relative float-end top-0'>
      <ImCross  color='red' size={25}/>
     </div>
<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
    
     {
         pdf && <>
               <Viewer fileUrl={data.posts[0].file} plugins={[newplugin]} />
                   
               
           </>
     }
{!pdf && <>NO PDF</>}
</Worker>
</div>}
    </div>
  )
}

export default PostSeen