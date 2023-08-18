import { useCallback, useMemo, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button, Typography, Box, Drawer } from '@mui/material';
import { useAuth } from './contexts/auth';
import { useNavigate } from 'react-router-dom';
import NavLinks from './navigation/NavLinks';
import RouteContent from './navigation/RouteContent';

const Header = ({ handleDrawerOpen, open, isLoged }) => {

  const navigation = useNavigate()
  const { signOut } = useAuth()

  const toolbarStyles = useMemo(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }), [])

  const iconButtonStyles = useMemo(() => (
    { mr: 2, ...(open && { display: 'none' }) }
  ), [open])

  return ( 
    <AppBar position="fixed" open={open}>
      <Toolbar sx={toolbarStyles}>
        <Box display='flex' alignItems='center'>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={iconButtonStyles}
            >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            CRM React App
          </Typography>
        </Box>
        {
          isLoged ?
          <Button color="inherit" onClick={signOut}>Logout</Button>
          :
          <Button color="inherit" onClick={() => navigation("/login")}>Login</Button>
        }
      </Toolbar>
    </AppBar>
  )
}

const SideBar = ({ open, handleDrawerClose}) => {
  const theme = useTheme();

  const drawerStyles = useMemo(() => ({
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
    },
  }), [])

  return (
    <Drawer
        sx={drawerStyles}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <NavLinks />
      </Drawer>
  )
}

const Content = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth()

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, [])

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, [])

  return (
    <Box display='flex'>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} isLoged={ !!user }/>
      <SideBar open={open} handleDrawerClose={handleDrawerClose} />
      <Main open={open}>
        <DrawerHeader />
        <RouteContent />
      </Main>
    </Box>
  )
}

const drawerWidth = 240;

// -------------- Componentes estilizados --------------

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
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default Content