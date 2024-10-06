import * as React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Button } from '@mui/material';

const drawerWidth = 240;

function Appbar(props) {
  const { items, role } = props;
  const navigate = useNavigate();

  const routeChoice = (text, role) => {
    return (
      role === 'admin' ?
      text === 'Dashboard' ? 
        '/dashboard/' :
        text === 'Users'?
          '/dashboard/admin/adduser':
          text === 'Project'?
            '/dashboard/admin/addproject':
            `/dashboard/${text.replace(' ', '').toLowerCase()}`
    :
      text === 'Dashboard' ?
        '/dashboard/user/' : 
        text === 'Add Task'?
          '/dashboard/user/adduser':
          text === 'View Task'?
            '/dashboard/user/viewtask':
            `/dashboard/${text.replace(' ', '').toLowerCase()}`
    )
  }

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userRole');
    localStorage.removeItem('authToken');
    navigate('/login');
  };
  
  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Task Manager
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
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
            {items.map((text, index) => {
              const route = routeChoice(text, role)
              return(
                <ListItem key={text} disablePadding>
                  <ListItemButton component={Link} to={route}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3}}>
        <Toolbar />
        <main sx={{ marginBottom: 2 }}>
            <Outlet />
        </main>
      </Box>
    </Box>
  );
}

export default Appbar