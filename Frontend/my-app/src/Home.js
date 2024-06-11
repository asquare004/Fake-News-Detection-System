import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import ProfileFragement from './ProfileFragment';
import PromptMainUI from './components/PromptMainUI.js';

//--------MUI imports----------------//
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

//-----------HOOKS-----------------------------//
import { useAuth } from './AuthProvider';
import { useState } from 'react';


//------------------ICONS---------------------------//
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';



//----------CONSTANTS--------------//
const drawerWidth = 240;
const topNavBarTitle = "Hypervion";

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [showProfileFragment, setShowProfileFragment] = useState(false);

  const drawerItemArray = ['Profile', 'History', 'Sign Out'];
  const drawerItemIconArray = [<PersonIcon />, <HistoryIcon />, <LogoutIcon />];
  const navigate = useNavigate();



  const handleCloseProfile = () => {
    setShowProfileFragment(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleProfile = () => {
    setShowProfileFragment(true);
    console.log(setShowProfileFragment);
  };

  const handleHistory = () => {

  };

  const handleSignOut = async () => {
    await auth.signOut();
    navigate('/');
  };

  const drawerItemHandler = [handleProfile, handleHistory, handleSignOut];


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {topNavBarTitle}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Avatar alt="DP" src={user.photoURL}  style={{ marginRight: '25px' }}/>
          <Typography variant="body1" gutterBottom>
            Welcome <br />
            {user.displayName}
          </Typography>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List>
          {drawerItemArray.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={drawerItemHandler[index]}>
                <ListItemIcon>
                  {drawerItemIconArray[index]}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        <PromptMainUI />
      </Main>

      {showProfileFragment && < ProfileFragement open={showProfileFragment} handleClose={handleCloseProfile} />}

    </Box>
  );
}
