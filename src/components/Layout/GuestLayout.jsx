import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../../context/ContextProvider'

export default function GuestLayout() {
  const {user_token} = useStateContext()

  if(user_token){
    return <Navigate to={'/dashboard'}/>
  }

  return (
    <div className='flex items-center justify-around h-screen relative' id='form-container'>
      <Outlet/>
    </div>
  )
}
