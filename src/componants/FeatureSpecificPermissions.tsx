import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Container } from '@mui/material';




export default function FeatureSpecificPermissions({permissions}) {
    const navigate = useNavigate()
    
   const renderPermissions = ()=>{
      
       return permissions && Object?.keys(permissions).map((permission)=>{
         if (permission !== 'feature') {
           return <Button
           onClick={()=>{navigate( `/admin/${permissions?.feature}/${permission}`)}} 
           sx={{width:'25px', fontSize:'13px'}}  
           variant='contained'>{permission}
          </Button>
      }
      
    })
    
  }
  
    return (
        <>
          <Container sx={
            {
             display:'flex',
             flexDirection:'column',
             alignItems:'start',
             justifyContent:'center',
             gap:3,
             width:'600px',
             height:'400px',
             }}>
          {renderPermissions()}
            </Container> 
        </>
    )
}







// import React, { useEffect, useState } from 'react'
// import MyCheckBox from './MyCheckBox';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import Url from '../Url';
// import { Box, Container, Stack } from '@mui/material';

// export default function FeatureSpecificPermissions({ permissions, handleChange, selectedFeaturePermissions, feature }) {
//     const [featurePermissions, setFeaturePermissions] = useState([]);

//     const { userId, featureId } = useParams()
//     useEffect(() => {
//         async function fetchData() {

//             const { data } = await axios.get(`${Url}getUserInfo/${userId}/${featureId}`)
//             setFeaturePermissions(data?.permissions)
//         }

//         if (featureId) {
//             fetchData()
//         }

//     }, [featureId])

//     if(!featurePermissions?.length) {
//         return null;
//     }
     
//     return (
//         <>
//             {permissions?.map((permission, ind) => {
                   
//                 return <MyCheckBox
//                     key={ind}
//                     handleChange={handleChange}
//                     fId={feature?.fId}
//                     pId={permission?.pId}
//                     checkedd={featureId ?
//                         featurePermissions.includes(permission._id):
//                         selectedFeaturePermissions?.includes(permission._id) 
//                     }
//                    />
//             })}
//         </>
//     )
// }
