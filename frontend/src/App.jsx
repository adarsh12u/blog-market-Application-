import React, { Suspense } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import About from './pages/About'
import Dashboard from './Dashboard/Dashboard'
import Login from './NavPages/Login'
import Home from './pages/Home'
const SignUp = React.lazy(()=>import('./NavPages/SignUp')) 
import MyHome from './pages/MyHome'
import Contact from './pages/Contact'
import CreatePost from './Components/CreatePost'
import UpdatePost from './Components/UpdatePost'
import PostSeen from './Components/PostSeen'
import SearchPage from './Components/SearchPage'

const queryClient = new QueryClient({
  defaultOptions :{
    queries:{
     staleTime:1000 * 60 *5
    }
  }
})



const App = () => {



  const { user} = useSelector((state)=>state.user)

const router  = createBrowserRouter([{
     path:'/',
     element:<Home/>,
     children:[
      {
       index:true,
        element:<MyHome/>
      },
      {
          path:'/dashboard',
          element: user ? <Dashboard/> : <Login/> ,
          
     },
     {
         path:'/create-post',
         element: user && user.isAdmin ? <CreatePost/> : <MyHome/>
     },
     {
        path:'/search',
        element:<SearchPage/>
     },
     {
      path:'/update-post/:id',
      element: user && user.isAdmin ? <UpdatePost/> : <MyHome/>
  },
  {
   path:'/post/:slug',
   element:<PostSeen/>
  },
    {
    path:'/about',
    element:<About/>
    },
   
      {
 path:'/login',
 element:<Login/>
    }
    ,
    {
      path:'/sign-up',
      element: <Suspense fallback = {<div>Loading..</div>}> <SignUp/> </Suspense>
           
    },{
      path:'/contact-us',
      element:<Contact/>
    }]
}])

  return (
    <div>
    
    <QueryClientProvider client={queryClient}>
      

     <RouterProvider router={router}/>
     <ReactQueryDevtools initialIsOpen={true}/>
    </QueryClientProvider>
     </div>
  )
}

export default App