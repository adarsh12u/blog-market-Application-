import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import {Link, useNavigate} from "react-router-dom" 
import axios from "axios";
import {toast} from 'react-toastify'
import { customurl } from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { signinerror, signprocess, signsucess } from "../user/userslice";

const Login = () => {
const {loading} =  useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
const navigate = useNavigate();
  const handlesubmit = async(e)=>{
    dispatch(signprocess())
    e.preventDefault();
      axios.post(`${customurl}auth/signin`,{
        email,password
     },{ withCredentials: true }
     ).then((res)=>{

          dispatch(signsucess(res.data))
          navigate("/about")
          toast.success("login sucessfull")
          // window.location.reload(true)
     }).catch((err)=>{
      dispatch(signinerror(err.response.data.message))
        toast.error(err.response.data.message)
      
     })
  }
  return (
    <div className=" h-[850px] md:h-[645px] bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className=" text-3xl mt-6 text-gray-900 font-extrabold text-center">
          Login
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className=" bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className=" space-y-6" onSubmit={handlesubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
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
            <div className={`flex justify-between items-center`}>
              <div className={`flex items-center`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className=" m-2">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-400 hover:text-blue-700"
              >
                Forgot your password ?
              </a>
            </div>
            </div>
           <div className=" w-full">
           <button className=" w-full rounded-lg text-white bg-black p-2" type="submit" gradientDuoTone={"purpleToBlue"}  disabled={loading} outline>{loading ? 'submitting...' : "submit"}  </button>
           {/* <Oauth/> */}
           </div>
           <div className={`flex w-full`  }>
             <h4>create account ?</h4>
             <Link to = "/sign-up" className="text-blue-600 pl-2">Sign Up</Link>
             
           </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
