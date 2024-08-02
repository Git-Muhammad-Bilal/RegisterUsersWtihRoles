import React from 'react'
import { NavLink, Navigate, Outlet, redirect, useLocation, useParams } from 'react-router-dom'
import Home from '../home/Home'
import ProtectedRoute from './ProtectedRoute'
import { Box, Container } from '@mui/material'

export default function LayOut({ setFeaturesNPermission, features }) {

  return (
    <>
      <Home setFeaturesNPermission={setFeaturesNPermission} />
      {features?.length === 4} || <ProtectedRoute featuresNPermission={features} />
      <Outlet />
    </>
  )
}
