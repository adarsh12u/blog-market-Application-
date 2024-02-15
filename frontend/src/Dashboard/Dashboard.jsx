import React, { useEffect, useState } from 'react'
import { useLocation} from 'react-router-dom'
import DashSlidebar from './DashSidebar';
import Profile from '../NavPages/Profile';
import DashPost from './DashPost';
import Users from '../NavPages/Users';
import DashComment from './DashComment';
import DashDash from './DashDash';


const Dashboard = () => {
  const location = useLocation();
  const[tab , settab] = useState('');
  
useEffect(()=>{
   const url = new URLSearchParams(location.search);
   const taburl = url.get('tab');
   if(taburl != null){
    settab(taburl)
   }
},[location.search])
  return (
    <div className=' flex flex-col md:flex-row gap-5'>
  
      <div className=' w-full md:w-[15%]'>
         <DashSlidebar/>
      </div>

  
<div className=' w-screen md:w-[85%] '>

  {
    tab==="profile" && <Profile/>
  }
  {
    tab ==="posts" && <DashPost/>
  }
  {
    tab ==="users" && <Users/>
  }
  {
    tab ==="comments" && <DashComment/>
  }
  {
    tab ==="dash" && <DashDash/>
  }
  </div>
    </div>
  )
}

export default Dashboard