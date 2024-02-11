import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import MyHome from './pages/MyHome'
import { useSelector } from 'react-redux'
import Contact from './pages/Contact'
import CreatePost from './pages/CreatePost'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import UpdatePost from './pages/UpdatePost'
import PostSeen from './pages/PostSeen'
import SearchPage from './pages/SearchPage'

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
     children:[{
          path:'/dashboard',
          element: user ? <Dashboard/> : <Login/> ,
          
     },
     {
         path:'/create-post',
         element: user && user.isAdmin ? <CreatePost/> : <Home/>
     },
     {
        path:'/search',
        element:<SearchPage/>
     },
     {
      path:'/update-post/:id',
      element: user && user.isAdmin ? <UpdatePost/> : <Home/>
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
      path:'/home',
      element:<MyHome/>
    },
      {
 path:'login',
 element:<Login/>
    }
    ,
    {
      path:'sign-up',
      element:<SignUp/>
           
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