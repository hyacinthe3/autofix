import React from 'react'
import {Outlet} from 'react-router-dom'
import Sidebar from './Sidebar'
import Settings from "./Settings";

const DashboardLayout = () => {
  return (
    <div>
      <Sidebar/>
      <Outlet/>
     
    </div>
  )
}

export default DashboardLayout
