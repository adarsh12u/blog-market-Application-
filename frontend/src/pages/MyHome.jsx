import React from 'react'
import { useSelector } from 'react-redux'
import { customurl } from '../axios';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Button, Card, Spinner } from 'flowbite-react';
import { Link } from 'react-router-dom';

const MyHome = () => {
  const {user} = useSelector((state)=>state.user)
  const { isLoading, data, isError } = useQuery({
    queryKey: ['post'],
    queryFn: async () => {
      const { data } = await axios.get(`${customurl}post/getpost`)
      return data;
    },
  });
if(isLoading){
  return <div className=' flex justify-center items-center min-h-screen'>
    <Spinner size={'xl'}/>
  </div>
}
  return (
    <section className=' p-2'>
      {user && user.isAdmin===false && 
        <div className=' text-center bg-yellow-100 mb-3 text-black  text-xs  mx-auto p-2 rounded-lg'>
                 <h1>You are currently logged in as a user, which means you do not have the ability to post blogs.but  you can see all the blogs, If you wish to contribute a blog post, please reach out to us</h1>
            </div>
}

        
        
          <div className='bg-black p-2 text-white flex flex-col items-center rounded-lg py-20'>
               <h1 className=' text-3xl md:text-6xl font-serif mt-10 '>Welcome to our blogs</h1>
     <div className='w-full md:w-[60vw] text-center mt-7'>
     <p>
                Start your Blog today enjoy the community of writers and readers who are passionate about sharing their stories and ideas we offer everything you need to get started.
               </p>
       
     </div>
          </div>
    <div className=' text-center mt-10 '>
        <h1 className=' text-3xl '>Our Blogs</h1>
        <div className='w-full md:w-[60vw] mx-auto  flex flex-wrap gap-10 justify-center  mt-7 '>
        {
       
      data  &&  data.posts.length > 0 ?  data.posts.map((value)=>{
        const image = value.file.includes('pdf') ? "https://www.iconpacks.net/icons/2/free-pdf-file-icon-3382-thumb.png":value.file
                 return   <Card className="max-w-sm" key={value._id}>
                <img src={image} className=' h-64 object-contain' alt="" />
                <Button size={'md'} color='gray' pill>
            {value.category}
          </Button> 
                 <p className=" font-medium text-xl  capitalize font font-serif text-gray-700 dark:text-gray-400">
                  {value.title}</p>
                    <Link to={`/post/${value.slug}`}>
                 <Button className=' w-full' >
                   Read more
                 </Button>
                    </Link>
                  
               </Card>
           }) : <h1 className=' text-xl font-semibold text-gray-500'>post not found</h1>
     }
        </div>
    </div>
    </section>
  )
}

export default MyHome