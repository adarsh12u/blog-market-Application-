
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { customurl } from '../axios';
import { Button, Card, Spinner } from 'flowbite-react';

const SearchPage = () => {
const [searchvalue,setsearch] = useState('');
const [data,setdata] = useState()
const[isLoading , setisloading] = useState(false)
    const location = useLocation();
    useEffect(()=>{
        const url = new URLSearchParams(location.search);
        const search = url.get('searchT')
       
                       setsearch(search);
                       axios.get(`${customurl}post/getpost?category=${search}`).then((res)=>{
                        setdata(res.data.posts)
                     setisloading(false)                         
                    }).catch((error)=>{
                        console.log(error)
                    })
    },[location.search])
 const queryfunction =(e , searchValue)=>{
     e.preventDefault();
     setisloading(true)
   axios.get(`${customurl}post/getpost?category=${searchValue}`).then((res)=>{
       setdata(res.data.posts)
    setisloading(false)                         
   }).catch((error)=>{
       console.log(error)
   })
            
            
            
            
      
    }


    if(isLoading ){
        return        <div className='flex justify-center items-center min-h-screen'>
   
        <Spinner size={'xl'}/>

       </div>

     }
 return (
    <section className=' w-full md:w-[70vw] mx-auto flex flex-col items-center gap-20 mt-10 mb-24'>
{/* input box */}
          <div>
               <form action="" onSubmit={(e)=>queryfunction(e,searchvalue)}>
  
                      <input type="text" value={searchvalue} className=' w-80 md:w-96 rounded-lg p-2 ' onChange={(e)=>setsearch(e.target.value)}  />
                   
               </form>
          </div>
     {/* cards */}
<div className=' flex flex-wrap gap-5'>
       


     {
       
       data &&  data.length > 0 ?  data.map((value)=>{
        const image = value.file.includes('pdf') ? "https://www.iconpacks.net/icons/2/free-pdf-file-icon-3382-thumb.png":value.file
                 return   <Card className="max-w-sm">
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

    </section>
  )
}

export default SearchPage