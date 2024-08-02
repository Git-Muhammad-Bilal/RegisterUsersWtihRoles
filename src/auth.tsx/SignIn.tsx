import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Url from '../Url';

const BackgroundContainer = styled('div')({
  // minHeight: '100vh',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage: 'url("https://example.com/background-image.jpg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
});

const FormContainer = styled(Container)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  padding: theme.spacing(6),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
  display: 'flex',
  flexDirection: 'column',
  width: '400px'

}));

const HeadingContainer = styled(Box)(({ theme }) => ({
  height: '100px',
  padding: theme.spacing(3),
  margin: 'auto',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  fontsize: '50px',
}))
const OrSignUpBox = styled(Box)(({ theme }) => ({
  height: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  fontsize: '50px',
}))

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  
  const navigate = useNavigate()
  
  const fetchUser = async () => {
    try {
      let { data } = await axios.post(Url+'getLogedInUser', {
        email:email,
        password:Number(password)
      })
      
      setUser(data?.user)
      if (data?.user) {
        localStorage.setItem('userId',data?.user?._id)    
        navigate(`/admin/roles`)

                  
      }
    } catch (error) {
       console.log(error?.message);
       
    }
  }
  

  return (
    <>

      <HeadingContainer><h1>Welcome!</h1>!</HeadingContainer>
      <BackgroundContainer>
        <FormContainer>
          <TextField
            value={email}
            label="Email"
            variant="outlined"
            onChange={(e)=>setEmail(e.target.value)}
            
            sx={{ marginBottom: 2, width: '100%' }}
            />
          <TextField
            value={password}
            label="Password"
            type="password"
            variant="outlined"
            onChange={(e)=>setPassword(e.target.value)}
            sx={{ marginBottom: 2, width: '100%' }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2, width: '100%' }}
            onClick={fetchUser}
          >
            Sign In
          </Button>
        </FormContainer>
      </BackgroundContainer>
    </>
  );
};

export default SignIn;
