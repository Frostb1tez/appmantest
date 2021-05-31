import React from 'react'
import { Header, Footer } from '../components'

const AppLayout = ({ children }) => {
  return (
    <div className="container">
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </div>
  )
}

export default AppLayout
