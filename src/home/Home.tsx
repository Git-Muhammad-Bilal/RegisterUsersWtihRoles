import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { NavLink, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import Logout from '../auth.tsx/Logout';
import axios from 'axios';
import Url from '../Url';
import { useEffect, useState } from 'react';
import { Container } from '@mui/material';

const drawerWidth = 240;

export default function Home({ setFeaturesNPermission }) {


  const [features, setFeatures] = useState([])
  const { subUserId } = useParams()
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')



  useEffect(() => {
    async function fetchData() {
      let result = [];
      
      const { data } = await axios.get(`${Url}getUserInfo/${userId}`)
      
      if (data?.length) {
        result = data.map((feature) => {
          let obj = {}
          obj.feature = feature?.featureName
          feature.permissions.map((permission) => obj[permission.name] = true)

          return obj
        })
      }

      setFeaturesNPermission([...result])
      setFeatures(data)
    }

    fetchData()


  }, [])


  const handleNavigation = (featureId, featureName) => {


    navigate(`/admin/${featureName}`)
  }

  const goBackToHome = () => {
    navigate(`/admin/roles`)
  }

  const featuresList = ['Roles', 'Users', 'Todos', 'Notes'];

  return (

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }} >
          <Typography onClick={goBackToHome} variant="h6" noWrap component="div">
            Register Users Based On Roles
          </Typography>
          <Logout />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {featuresList?.map((feature, ind) => {
              let isFeat = features?.find((f) => f.featureName === feature)

              if (isFeat) {

                return <ListItem key={features[ind]?._id} disablePadding>

                  <ListItemButton onClick={() => { handleNavigation(feature[ind]?._id, feature?.toLocaleLowerCase()) }}>
                    <ListItemIcon>
                      {ind % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItemButton>
                </ListItem>
              }


            })}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

      </Box>

      <Container>
        <h3>Navigate to features to see User/Role based permissions</h3>
      </Container>
    </Box>

  );
}
