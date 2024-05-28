import React from 'react'
import { Outlet } from 'react-router-dom'

export default function MainContainer({children}) {
  return (
    <div id='main-content'>
      <div className='container-fluid'>
        <Outlet/>
      </div>
    </div>
  )
}
