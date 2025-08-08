import React from 'react'
import SiteHeader from './../components/SiteHeader'
import SiteFooter from './../components/SiteFooter'
import { Outlet } from 'react-router'


const PublicLayout = () => {
  return (
    <div>
        <SiteHeader/>
        <main>
            <Outlet/>
        </main>
        <SiteFooter/>
    </div>
  )
}

export default PublicLayout