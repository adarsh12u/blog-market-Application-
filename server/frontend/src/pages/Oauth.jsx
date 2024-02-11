import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { app } from '../firebase'
import { GoogleAuthProvider , signInWithPopup , getAuth } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { signsucess } from '../user/userslice'
import { Navigate , useNavigate } from 'react-router-dom'
import axios from 'axios'
import { customurl } from '../axios'
import { toast } from 'react-toastify'
const Oauth = () => {
    const dispatch = useDispatch();
    const auth = getAuth(app)
    const navigate = useNavigate();
    const handleoth = async()=>{
         const provider = new GoogleAuthProvider()
         provider.setCustomParameters({promt:'select_account'})
         try {
            const resultFromGoogle = await signInWithPopup(auth,provider)
         const datas =axios.post(`${customurl}auth/google`,{
            name:resultFromGoogle.user.displayName,
                    email:resultFromGoogle.user.email,
                    googlephotourl:resultFromGoogle.user.photoURL  
         },{withCredentials:true}).then((res)=>{
           if(res.data == "sign IN sucessfully"){
            toast.success("sign in sucessfully you can login now")
           }
            dispatch(signsucess(res.data))
            navigate('/')
         }).catch((err)=>{
            console.log(err)
         })
         
           
        } catch (error) {
            console.log(error)
         }
    }
  return (
    <div className=' mt-2'>
         <Button onClick={handleoth} className=' w-full' gradientDuoTone='tealToLime' outline>
             <AiFillGoogleCircle className=' h-5 w-5'/>
          Continue with google </Button>
    </div>
  )
}

export default Oauth