import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopNavbar from './TopNavbar'
import MainContainer from './MainContainer'

export default function DashboardLayout() {
  return (
    <div className='wrapper'>
      <TopNavbar/>
      <Sidebar/>

      <MainContainer>
        <Outlet/>
      </MainContainer>

    </div>
  )
}
