import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../context/ContextProvider';
import axiosClient from '../../axiosClinet';

export default function MSignin() {
    const [payload, setPayload] = useState({
        email:'',
        password: '',
      })
      const [loading, setLoading] = useState(false)
      const [errors, setErrors] = useState([])
      const {setUserToken, setUser, user_token} = useStateContext()
      const navigate = useNavigate()
    
      const login = (event) => {
        event.preventDefault()
        setLoading(true)
        console.log(payload);
        setErrors([])
    
        axiosClient.post('/login', payload)
          .then(({data}) => {
            setLoading(false)
            setUser(data.user)
            setUserToken(data.user_token)
            navigate('/dashboard')
          })
          .catch(error_reponse => {
            setLoading(false)
            const response = error_reponse.response.data.errors
            const status = error_reponse.response.status
    
            if(response || status === 422){
              if(response){
                setErrors(response)
              }else{
                setErrors({password : [error_reponse.response.data.message_error]})
              }
            }
          })
      }
  return (
    <div className="max-w-lg w-full relative z-10">
    <div
      style={{
        boxShadow:
          '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }}
      className="bg-[#1f2937] rounded-lg shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-center text-3xl font-extrabold text-white">
          Welcome Back
        </h2>
        <p className="mt-4 text-center text-gray-400">Sign in to continue</p>
        <form method="POST" action="#" className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm">
            <div>
              <label className="sr-only" htmlFor="email">
                Email address
              </label>
              <input
                placeholder="Email address"
                className="appearance-none relative block w-full px-3 py-3 border bg-[#374151] text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                required
                autoComplete="email"
                type="email"
                name="email"
                id="email"
              />
              {
                errors.email ? <p className='text-red-500 italic'><i class="fa-solid fa-circle-exclamation"></i> {errors.email}</p> : null
              }
            </div>
            <div className="mt-4">
              <label className="sr-only" htmlFor="password">
                Password
              </label>
              <input
                placeholder="Password"
                className="appearance-none relative block w-full px-3 py-3 border bg-[#374151] text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                required
                autoComplete="current-password"
                type="password"
                name="password"
                id="password"
              />
              {
                errors.password ? <p className='text-red-500 italic'><i class="fa-solid fa-circle-exclamation"></i> {errors.password}</p> : null
              }
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            {/* <div className="flex items-center">
              <input
                className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 border-gray-600 rounded"
                type="checkbox"
                name="remember-me"
                id="remember-me"
              />
              <label
                className="ml-2 block text-sm text-gray-400"
                htmlFor="remember-me"
              >
                Remember me
              </label>
            </div> */}
            <div className="text-sm">
              {/* <a
                className="font-medium text-indigo-500 hover:text-indigo-400"
                href="#"
              >
                Forgot your password?
              </a> */}
            </div>
          </div>
          <div>
            <button
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
      {/* <div className="px-8 py-4 bg-gray-700 text-center">
        <span className="text-gray-400">Don't have an account?</span>
        <a
          className="font-medium text-indigo-500 hover:text-indigo-400"
          href="#"
        >
          Sign up
        </a>
      </div> */}
    </div>
  </div>
  );
}
