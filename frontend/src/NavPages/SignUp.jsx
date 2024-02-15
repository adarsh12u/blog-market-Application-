import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { Link, useNavigate } from 'react-router-dom';

import axios from "axios"
import { customurl } from '../axios';
import { toast } from 'react-toastify';


const SignUp = () => {
    const [email, setEmail] = useState("");
    const [username, setName] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    const handlesubmit =async (e)=>{
      e.preventDefault();
    
        
            axios.post(`${customurl}auth/signup` , {username , password ,email} , { withCredentials: true }).then((res)=>{
                      toast.success("Signup Sucessfully")
                       setName("");
                       setEmail("");
                       setPassword("");
                       navigate('/login')
                       
           }).catch((err)=>{
              console.log(err)
                 toast.error(err.response.data.message)
           })
    }
   
    return (
      <div className=" h-[850px] md:h-[645px] bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className=" text-3xl mt-6 text-gray-900 font-extrabold text-center">
            Sign Up 
          </h2>
        </div>
  
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className=" bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handlesubmit} className=" space-y-6">
                <div>
                     <label htmlFor="name
                     " className=' block text-sm font-medium text-gray-700'>Name</label>
                     <div>
                         <input type="text" autoComplete='false' className=' mt-1 px-3 appearance-none block w-full border placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500  border-gray-300 rounded-md py-2' name='name' value={username} onChange={(e)=>{setName(e.target.value)
                         }} />
                     </div>
                </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                autoSave='true'>
                  EmailAddress
                </label>
                <div className="mt-1">
                  <input
                    name="email"
                    autoComplete="email"
                    className=" appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500  "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                  />
                </div>
              </div>
  
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    name="password"
                    autoComplete="current-password"
                    className=" appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500  "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={visible ? "text" : "password"}
                  />
                  {visible ? (
                    <AiOutlineEye
                      size={25}
                      className="absolute right-2 top-2 cursor-pointer"
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      size={25}
                      className="absolute right-2 top-2 cursor-pointer"
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
              </div>
            
            

             <div className=" w-full">
                <button className=" w-full p-2 rounded-lg bg-black text-white" type="submit" gradientDuoTone={"purpleToBlue"} outline> Submit </button>
                 {/* <Oauth/> */}
                 </div>
             <div className={`flex justify-between w-full`  }>
               <h4>Already have an account ?</h4>
               <Link to={'/login'} className="text-blue-600 pl-2">Sign In</Link>
             </div>
            </form>
          </div>
        </div>
      </div>
    );
}

export default SignUp