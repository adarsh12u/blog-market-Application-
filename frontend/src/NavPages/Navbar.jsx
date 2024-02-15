import { section } from '../data'
import { RiMenu3Line } from "react-icons/ri";
import React, { useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom';
import { Button, TextInput } from 'flowbite-react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
const Navbar = () => {
    const[open,setOpen] = useState(false);
    const {user} = useSelector((state)=>state.user);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        
        navigate(`/search?searchT=${searchTerm}`) 
      };
  
  return (
      <header className='  h-16 lg:h-20   border-b-2 ' >
           <nav  className=' lg:p-2  lg:pr-10 lg:rounded-xl flex   flex-col justify-between lg:flex-row lg:gap-32 lg:items-center'>
                 <div className=' flex justify-between items-center p-4'>
                   <h1 className=' text-2xl lg:text-3xl font-bold'> Blog Market. </h1>
                   <Button className='w-12 h-10 lg:hidden' color='gray' pill onClick={()=>navigate('/search')}>
        <AiOutlineSearch />
      </Button>
                   <div className=' flex gap-2 items-center'>
                 {
                   user  ?( 
                    <img  src={user.profilePicture}  onClick={()=>navigate('/dashboard?tab=profile')} className=' lg:hidden rounded-full h-8 w-8' alt="" /> 
                   
                )   : (<Link to={'/login'}  className=' lg:hidden hover:text-slate-100 transition-all delay-100 ease-in text-lg font-medium'> <Button gradientDuoTone='purpleToBlue' outline>Login</Button>  </Link>
                 )}

                    <RiMenu3Line size={30} className='block lg:hidden' onClick={()=>setOpen(!open)} />
                   </div>
               </div>
               <form onSubmit={handleSubmit}>
       
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
          
      </form>
               <div className={`${open?` block ` : `hidden`} mt-[-10px] z-50 lg:hidden  bg-slate-100  flex flex-col lg:flex-row  gap-5  lg:gap-10`} >
                   {
                      section.map((item)=>{
                            return <div key={item.id} className=' border-b-2 text-center  pb-2 cursor-pointer'onClick={()=>setOpen(!open)}>
                                  
                                     <Link to={item.href} > 
                                     <h1 className=' hover:text-slate-100 transition-all delay-100 ease-in text-lg font-medium'>{item.text}</h1>
                                     </Link>
                             </div>
                      })
                   }
               </div>
               <div className={` hidden    pt-5 lg:pt-0  lg:flex  gap-5  lg:gap-20`} >
                   {
                      section.map((item)=>{
                            return <div key={item.id} className=' text-center  cursor-pointer' >
                                  
                                     <Link to={item.href} > 
                                     <h1 className=' hover:text-blue-600 transition-all delay-100 ease-in text-lg font-medium'>{item.text}</h1>
                                     </Link>
                             </div>
                      })
                   }
                  
               </div>
               <div className=' hidden lg:block pl-10 '>
{
  user ? (<img src={user.profilePicture} onClick={()=>navigate('/dashboard?tab=profile')} className=' cursor-pointer hidden lg:block rounded-full h-8 w-8' alt="" /> ):(

<Link to={'/login'}  className=' hover:text-slate-100 transition-all delay-100 ease-in text-lg font-medium'> <Button gradientDuoTone='purpleToBlue' outline>Login</Button>  </Link>
  )
}
</div>
           </nav>
      </header>
    
  )
}

export default Navbar