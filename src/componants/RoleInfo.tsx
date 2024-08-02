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
import RoleInfoTable from './RoleInfoTable';

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

const RoleInfo = ({ rolePermissions}) => {
  
  const [features, setFeatures] = useState([])
  const [permissions, setPermissions] = useState([]);
  const [roleInfo, setRoleInfo] = useState([]);
  const { roleId, featureId, userId } = useParams()


  useEffect(() => {
    async function fetchData() {

      const { data } = await axios.get(Url + 'getFeatures');
      if (roleId) {
        const { data: { RoleSpecfiedFeatures, roleName } } = await axios.get(Url + `getRoleInfo/${roleId}`)
         
        setRoleInfo({ roleSpecfiedFeatures:[...RoleSpecfiedFeatures], roleName })
      }
      
       

      
      setFeatures(data?.features)
      setPermissions(data?.permissions)
    }

    fetchData()

  }, [featureId])
  

  return (
    <>
      <RoleInfoTable
        features={features}
        permissions={permissions}
        existingInfoForEdit={roleInfo}
        input={rolePermissions?.add || rolePermissions?.edit}
        savebutton={rolePermissions?.add || rolePermissions?.edit}
        rolePermissions ={rolePermissions}
        
      />
    </>
  );
};

export default RoleInfo;