import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  styled,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import axios from 'axios';
import Url from '../Url';
import { pink } from '@mui/material/colors';
import { useLocation, useParams } from 'react-router-dom';
import MyCheckBox from './MyCheckBox';
import FeatureSpecificPermissions from './FeatureSpecificPermissions';

const StyledTableContainer = styled(TableContainer)`
  width: 100%;
  display: flex;
  flex-direction:column;
  align-items:center;
  // justify-content: flex-start;
  `;

const StyledTable = styled(Table)`
  
  width: 80%;
  max-width: 600px;
  border-collapse: collapse;
  `;

const StyledTableCell = styled(TableCell)`
  text-align: center;
  padding: 6px;
  font-weight: bold;
  background-color: #f0f0f0; /* Light gray background for header cells */
`;


const RoleInfoTable = ({features, permissions, existingInfoForEdit ,input, savebutton, rolePermissions}) => {
  
  const [val, setVal] = useState('')
  const [roleName, setRoleName] = useState('');

  const [payload, setPayload] = useState({});

  const { roleId, featureId, userId} = useParams()
  
  const {pathname} = useLocation() 
  
  let isEditORAdd =roleId?!rolePermissions?.edit:!rolePermissions?.add
  


  function handleChange(fId, pId, isChecked) {

    setPayload((pre) => {

      if (pre[fId]?.includes(pId)) {
        pre[fId] = pre[fId].filter((p) => Number(p) != Number(pId))

      } else if (pre[fId]) {

        pre[fId].push(pId)

      } else {
         pre[fId] = [pId]
      }
      return { ...pre }
    })

    console.log(payload,'payload');
    
  }


  function handleSaveFeatures() {
    let endPoint = roleId ? 'editRole' : 'createRole'
    axios.post(Url + endPoint, {
      permissions: payload,
      role: roleName,
      roleId: roleId
    })
  }

  
  const renderFeatureSideBarFeaturesList = ()=>{
   return ['Feature','Add', 'List', 'Read', 'Edit', 'Delete' ," " ].map((name, index) => (
                     
        <StyledTableCell key={index}>
           { (index+1 === 7 ) ? 
           <Button disabled ={!roleName || isEditORAdd} onClick={handleSaveFeatures} variant='contained'>save</Button>
           :name
           } 
       </StyledTableCell>
     
     ))
  } 
    


  let renderFeatures =() => {
   return features?.map((feature, rowIndex) => {
                  
      return <TableRow key={rowIndex}>
        <StyledTableCell>
          {feature?.featureName}
        </StyledTableCell>
         
         {renderPermissions(feature, rowIndex)}


      </TableRow>
    })
 }
 
  let renderPermissions =(feature,rowIndex) => {
    
    let slectedPermissions = existingInfoForEdit?.roleSpecfiedFeatures?.filter(({featureId})=>(feature?._id === featureId ))
    return permissions?.map((permission, ind) =>{
      
      return  <MyCheckBox
                     key={permission?._id || permission+Date.now()}
                     handleChange={handleChange}
                     fId={feature?.fId}
                     pId={permission?.pId}
                     checkedd={slectedPermissions && slectedPermissions[0]?.permissions?.includes(permission?._id || permission)}
                     edit = {roleId && !rolePermissions?.edit}
                     add ={!rolePermissions?.add}
                     />
          })
 }

  
 return (
   
    
  <StyledTableContainer>
    
    
    
         <Button variant='contained' onClick={() => setRoleName(val || existingInfoForEdit?.roleName)}>save name</Button>
           <h2>{roleName}</h2>
         
       {  input && <TextField
            onChange={(e) => { setVal(e.target.value) }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setRoleName(val)
              }
            }}
            disabled ={roleId?!rolePermissions?.edit:!rolePermissions?.add}
            value={val || existingInfoForEdit?.roleName}
            placeholder='Role Name'
            variant="outlined"
            sx={{ marginBottom: 2, width: '43%', }}
            />
            }
      <StyledTable>
        <TableHead>
            {renderFeatureSideBarFeaturesList()}
        </TableHead>
        <TableBody>
            
            {renderFeatures()}
        </TableBody>
      
      </StyledTable>
    </StyledTableContainer>
  
);

};

export default RoleInfoTable;









