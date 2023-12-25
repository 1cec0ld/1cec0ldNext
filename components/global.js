import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { AdminPanelSettings, ChevronLeft, ChevronRight } from '@mui/icons-material';
import logo from '../public/fractalice.gif'
import { Avatar, CardHeader, List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import Link from 'next/link';

const drawerWidth = 240;

const DrawerHeader = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: open ? 'space-between' : 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer - 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Title = () => {
  return <Typography variant="h6" noWrap component="span"><Link href='/'>{process.env.NEXT_PUBLIC_VERSION}</Link></Typography>
}

export default function Global({children}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <CardHeader sx={!open && {marginLeft: `calc(${theme.spacing(7)} + 1px)`}}
            avatar={<Avatar component='span' alt="1ce" src={logo.src}/>}
            title={<Title/>}
          />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader open={open}>
          {open &&
            <>
              <Typography variant="h6" noWrap component="span">
                Links
              </Typography>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeft />
              </IconButton>
            </>
          }
          {!open &&
            <IconButton onClick={handleDrawerOpen}>
              <ChevronRight />
            </IconButton>
          }
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key="cpanel" disablePadding sx={{display: 'block'}}>
            <ListItemButton 
              sx={{
                minHeight: 48,
                justifyContent:  'initial' ,
                px: 2.5,
              }}
              component="a" href="/dancing">
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center'
                }}
                >
                <AdminPanelSettings />
              </ListItemIcon>
              <Typography sx={{pl: 1}} variant="body1" noWrap component="span">
                TBD
              </Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
