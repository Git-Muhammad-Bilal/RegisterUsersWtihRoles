import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Home from '../home/Home'

export default function FeatureLayOut() {
  return (
    <div>
      
      <Outlet/>         
    </div>
  )
}
