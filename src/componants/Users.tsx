import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import { Box, Button, styled } from '@mui/material';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios'
import Url from '../Url';

const ParContainer = styled('div')(({ theme }) => ({
    height: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
    overflowY: 'scroll'
}))


const Users = ({ userPermissions }) => {
    const [userList, setUserList] = useState([]);

    const { userId } = useParams()
    useEffect(() => {
        let fetchUsers = async () => {
            let { data } = await axios.get(Url + 'getUserList')

            setUserList(data)
        }
        fetchUsers();
    }, [])

// debugger
    return (
        <ParContainer>
            <div>
                <Typography variant="h5" gutterBottom>
                    List of Users
                </Typography>
            </div>
            <List>
                <Box ml={20} mb={5} mt={6}>
                    {
                      
                     userPermissions?.add && <NavLink to={`/admin/userSignUp`}>
                            <Button variant='outlined'>New</Button>
                        </NavLink>
                    }
                </Box>
                <hr />
                {
                    userList.length ?

                        userList?.map((user) => {


                            return <ListItem sx={{
                                '&:hover': {
                                    background: '#1976d2', color: 'white', // Change this to the desired color on hover
                                },
                            }} >
                                <NavLink to={`/admin/user/${user?._id}`}>

                                    <ListItemText primary={user?.name} />
                                </NavLink>
                            </ListItem>
                        })


                        : <h4>No Users found!</h4>

                }
            </List>
        </ParContainer >
    );
};

export default Users;
