import {Outlet} from 'react-router-dom'
import React from 'react'
import Inde from './inde'
import Footer from './Footer'
const Layout = () => {
  return (
    <div>
        <Inde/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout