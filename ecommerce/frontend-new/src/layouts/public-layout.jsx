import React from 'react'
import SiteHeader from './../components/SiteHeader'
import SiteFooter from './../components/SiteFooter'
import { Outlet } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './../redux/store'



const PublicLayout = () => {
  return (
    <Provider store={store}>
      <div>
        <SiteHeader />
        <main>
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </Provider>

  )
}

export default PublicLayout