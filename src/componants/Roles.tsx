import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import { Box, Button, styled } from '@mui/material';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import Url from '../Url';

const ParContainer = styled('div')(({ theme }) => ({
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto'
}))

const Roles = ({ rolePermissions }) => {
    
    const [roles, setRoles] = useState([])

    const navigate = useNavigate()
    const { userId } = useParams()
    
    useEffect(() => {
        async function fetchRoles() {
            const { data } = await axios.get(`${Url}getRoles`)
            setRoles(data)
        }
        fetchRoles()
    }, [])

    

    function goToRoleTable(id) {
        navigate(`/admin/roleInfoTable/${id}`)
    }



    return (
        <ParContainer>
            <div>
                <Typography variant="h5" gutterBottom>
                    List of Roles
                </Typography>
            </div>
            <List>
                <Box ml={20} mb={5} mt={6}>
                    {
                      rolePermissions?.add &&
                        <NavLink to={`/admin/roleInfoTable`}>
                            <Button variant='outlined'>New</Button>
                        </NavLink>
                    }
                </Box>
                {
                    !roles.length ? <h4>No roles defined!</h4> :
                        <>
                            {

                                roles.map((role) => {

                                    return <ListItem key={role?._id} onClick={() => goToRoleTable(role?._id)}>
                                        <ListItemText primary={role?.roleName} />
                                    </ListItem>
                                })
                            }
                        </>


                }
            </List>
        </ParContainer>
    );
};

export default Roles;
