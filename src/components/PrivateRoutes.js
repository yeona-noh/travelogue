import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoutes() {
    let auth = {'token':false}
  return (
    <div>
      {auth.token ? <Outlet /> : <Navigate to='/login' /> }
    </div>
  )
}

export default PrivateRoutes
