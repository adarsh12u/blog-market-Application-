import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

import Footers from './Footers'

const Home = () => {
  return (
    <>
    <Navbar/>
    <div>
          <Outlet/>
    </div>
    <Footers/>
    </>
  )
}

export default Home