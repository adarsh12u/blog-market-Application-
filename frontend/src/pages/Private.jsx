import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet  , Navigate } from 'react-router-dom'
const Private = () => {
 const { user} = useSelector((state)=>state.user)
    return (
        <div>
{
             
             user ? <Outlet/>  : <Navigate to={'/sign-up'} />
            }
        </div>
        )
}

export default Private