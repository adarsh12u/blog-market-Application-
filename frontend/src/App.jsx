import React, { Suspense } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import MyHome from './pages/MyHome'

const PostSeen = React.lazy(()=>import('./Components/PostSeen'))
import { Spinner } from 'flowbite-react'
const UpdatePost = React.lazy(()=>import('./Components/UpdatePost'))
const About = React.lazy(()=>import('./pages/About'))
const Dashboard = React.lazy(()=>import('./Dashboard/Dashboard'))
const Login = React.lazy(()=>import('./NavPages/Login')) 
const SignUp = React.lazy(()=>import('./NavPages/SignUp')) 
const Contact = React.lazy(()=>import('./pages/Contact'))
const CreatePost = React.lazy(()=>import('./Components/CreatePost'))
const SearchPage = React.lazy(()=>import('./Components/SearchPage'))

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
          element: user ? <Suspense fallback = {<div className='flex justify-center items-center min-h-screen'>
   
          <Spinner size={'xl'}/>
  
         </div>}><Dashboard/> </Suspense>   :<Suspense fallback = {<div className='flex justify-center items-center min-h-screen'>
   
   <Spinner size={'xl'}/>

  </div>}><Login/></Suspense>  ,
          
     },
     {
         path:'/create-post',
         element: user && user.isAdmin ?<Suspense fallback = {<div className='flex justify-center items-center min-h-screen'>
   
         <Spinner size={'xl'}/>
 
        </div>}><CreatePost/></Suspense>  : <MyHome/>
     },
     {
        path:'/search',
        element:<SearchPage/>
     },
     {
      path:'/update-post/:id',
      element: user && user.isAdmin ?<Suspense fallback = {<div className='flex justify-center items-center min-h-screen'>
   
      <Spinner size={'xl'}/>

     </div>}><UpdatePost/></Suspense>  : <MyHome/>
  },
  {
   path:'/post/:slug',
   element:<PostSeen/>
  },
    {
    path:'/about',
    element:<Suspense fallback = {<div className='flex justify-center items-center min-h-screen'>
   
    <Spinner size={'xl'}/>

   </div>}><About/></Suspense>
    },
   
      {
 path:'/login',
 element:<Suspense fallback = {<div className='flex justify-center items-center min-h-screen'>
   
 <Spinner size={'xl'}/>

</div>}><Login/></Suspense>
    }
    ,
    {
      path:'/sign-up',
      element: <Suspense fallback = {<div className='flex justify-center items-center min-h-screen'>
   
      <Spinner size={'xl'}/>

     </div>}> <SignUp/> </Suspense>
           
    },{
      path:'/contact-us',
      element:<Suspense fallback = {<div className='flex justify-center items-center min-h-screen'>
   
      <Spinner size={'xl'}/>

     </div>}><Contact/></Suspense>
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