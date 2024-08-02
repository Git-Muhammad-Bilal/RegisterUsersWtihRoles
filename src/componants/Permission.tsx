import { Box, Container } from '@mui/material'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export default function Permission({permissionDetail,isPermission,TodosRNotes}) {

  if (!isPermission) {
     return null;
  } 

  if (isPermission && !isPermission[permissionDetail]) {
    return <Navigate to={`/admin/${TodosRNotes}`} />
  }  
  
  
  return (

    <Container sx={
        {
         display:'flex',
         flexDirection:'column',
         alignItems:'center',
         justifyContent:'center',
         gap:3,
         width:'600px',
         height:'400px',
         }}>
      <Box><h1>{permissionDetail}</h1></Box>
        </Container> 

  )
}
