import React, { Children } from 'react';
import {useHistory} from 'react-router';
import clsx from 'clsx';
import { makeStyles, useTheme, fade } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PeopleIcon from '@material-ui/icons/People';
import MessageIcon from '@material-ui/icons/Message';
import InputBase from '@material-ui/core/InputBase';
import FindReplaceIcon from '@material-ui/icons/FindReplace'
import AssignmentIcon from '@material-ui/icons/Assignment';
import TrainersProfile from '../TrainerProfiles/TrainersProfile';
import RequestForReplacement from './RequestForReplacement';
import BranchesProfile from '../BranchProfiles/BranchesProfile';
import BranchParameters from './BranchParameter';
import BranchProfile from  '../BranchProfiles/BranchProfile';
import BranchMain from './BranchMain';
import Exit from '@material-ui/icons/ExitToApp';
import Calendar from './Calendar/Calendar';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Chat from '../Chat/Chat';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  title: {
    flexGrow: 1,
    textAlign:"left"
  },
  hide: {
    display: 'none',
  },
  item:{
    textAlign:'right'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

export default function PersistentDrawerRight() {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [comp, setComp] = React.useState(2);

  const CompProps =(val)=>{
    setComp(val);
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getContent = (comp) => {
    switch (comp) {
      case 1:
        return <BranchProfile comp={CompProps}/>;
      case 2:
        return <BranchMain comp={CompProps} />;
      case 3:
      return <Calendar />;
      case 4:
        return <BranchParameters comp={CompProps} />;
      case 5:
      return <RequestForReplacement comp={CompProps} />;
      case 6:
      return <TrainersProfile comp={CompProps} />;
      case 7:
        return <BranchesProfile comp={CompProps} />;
      case 8:
        return <Chat/>;
    }
  };

  const chatDetails = () =>{
    setComp(8);
    localStorage["fromProfile"] = false;
    
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            SportMatch
          </Typography>
         
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >

            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Typography paragraph>
        {getContent(comp)}
        </Typography>
        
      </main>
      <Drawer
        dir="rtl"
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List onClick={handleDrawerClose}>
          <MenuItem className={classes.item} button onClick={(e) => setComp(1)}>
                <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                <ListItemText primary="הפרופיל שלי" />
            </MenuItem>
            <Divider />
            <MenuItem className={classes.item} button onClick={(e) => setComp(2)}>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="ניהול הודעות החלפה"/>
            </MenuItem>
            <MenuItem className={classes.item} button onClick={(e) => setComp(3)}>
                <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
                <ListItemText primary="יומן הודעות החלפה"/>
            </MenuItem>
            <MenuItem className={classes.item} button onClick={(e) => setComp(4)}>
                <ListItemIcon><AssignmentIcon /></ListItemIcon>
                <ListItemText primary="ניהול פרמטרים"/>
            </MenuItem>
            <MenuItem className={classes.item} button onClick={(e) => setComp(5)} >
                <ListItemIcon><FindReplaceIcon /></ListItemIcon>
                <ListItemText primary="צור הודעת החלפה"/>
            </MenuItem>
            <MenuItem className={classes.item} button onClick={(e) => setComp(6)} >
                <ListItemIcon><PeopleIcon /></ListItemIcon>
                <ListItemText primary="מאגר מאמנים"/>
            </MenuItem>
            <MenuItem className={classes.item} button onClick={(e) => setComp(7)} >
                <ListItemIcon><PeopleIcon /></ListItemIcon>
                <ListItemText primary="מאגר מועדונים"/>
            </MenuItem>
            <MenuItem className={classes.item} button onClick={()=> chatDetails()}>
                <ListItemIcon><MessageIcon /></ListItemIcon>
                <ListItemText primary="צ'אט"/>
            </MenuItem>
            <Divider />
            <MenuItem className={classes.item} button onClick={() => history.push("/")}>
                <ListItemIcon><Exit/></ListItemIcon>
                <ListItemText primary="התנתק"/>
            </MenuItem>
        </List>
      </Drawer>
    </div>
  );
}