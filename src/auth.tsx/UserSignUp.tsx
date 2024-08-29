import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Url from '../Url';

const BackgroundContainer = styled('div')({
  minHeight: '80vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage: 'url("https://example.com/background-image.jpg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
});

const FormContainer = styled(Container)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
  display: 'flex',
  flexDirection: 'column',
  width: '400px',
}));

const HeadingContainer = styled(Box)(({ theme }) => ({
  height: '30px',
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
}));
const OrSignInBox = styled(Box)(({ theme }) => ({
  height: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  fontsize: '50px',
}))


const UserSignUp = ({ userPermissions }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate()
  const { subUserId } = useParams()

  useEffect(() => {
    async function fetchRoles() {
      const { data } = await axios.get(`${Url}getRoles`)
      setRoles(data)
      const { data: user } = subUserId && await axios.get(`${Url}getUserSignUpInfo/${subUserId}`)
      if (user) {
        setUser(user)
        let { roleName } = data?.find(({ _id }) => user?.role === _id)
        setName(user?.name)
        setEmail(user?.email)
        setRole(roleName)
        setPassword(user.password)
      }
    }

    fetchRoles()
  }, [subUserId])

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleCreateUser = async () => {
    let roleId = roles.find(({ roleName }) => roleName === role);
    let { data } = await axios.post(`${Url}createUser`, {
      name: name,
      email: email,
      role: roleId?._id,
      password: password,
      _id: subUserId || null

    })


    if (data) {
      navigate('/admin/Users')
    }
  }


  return (
    <>

      <BackgroundContainer>
        <FormContainer>
          <HeadingContainer>
            <h4>Create User</h4>
          </HeadingContainer>
          <TextField
            value={name}
            label="Username"
            disabled={subUserId && !userPermissions?.edit}
            onChange={handleNameChange}
            variant="outlined"
            sx={{ marginBottom: 2, width: '100%' }}
          />
          <TextField
            value={email}
            onChange={handleEmailChange}
            label="Email"
            disabled={subUserId && !userPermissions?.edit}
            variant="outlined"
            sx={{ marginBottom: 2, width: '100%' }}
          />
          <TextField
            select
            value={role}
            onChange={handleRoleChange}
            label="Role"
            disabled={subUserId && !userPermissions?.edit}
            variant="outlined"
            sx={{ marginBottom: 2, width: '100%' }}
          >
            {
              roles?.map(({ roleName, _id }) => (<MenuItem key={_id} value={roleName}>{roleName}</MenuItem>))
            }
          </TextField>
          <TextField
            value={password}
            onChange={handlePasswordChange}
            label="password"
            disabled={subUserId && !userPermissions?.edit}
            type="password"
            variant="outlined"
            sx={{ marginBottom: 2, width: '100%' }}
          />
          <Button
            variant="contained"
            disabled={subUserId && !userPermissions?.edit}
            color="primary"
            sx={{ marginTop: 2, width: '100%' }}
            onClick={() => handleCreateUser()}
          >
            Sign Up
          </Button>
        </FormContainer>
      </BackgroundContainer>
    </>
  );
};

export default UserSignUp;
