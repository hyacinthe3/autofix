import React from 'react'
import {Outlet} from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AdminSettings from "./AdminSettings";

const AdminLayout = () => {
  return (
    <div>
      <AdminSidebar/>
      <Outlet/>
       {/* Settings */}
              <AdminSettings />
    </div>
  )
}

export default AdminLayout
