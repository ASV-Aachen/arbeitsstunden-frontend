import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AuthRoute from '../AuthRoute.jsx'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import WorkIcon from '@material-ui/icons/Work';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccessibilityIcon from '@material-ui/icons/Accessibility';

import TakelHeader from './TakelHeader.jsx';


import DashboardScreen from './dashboard/DashboardScreen.jsx';
import SeasonsScreen from './seasons/SeasonsScreen.jsx';
import WorkinghoursScreen from './workinghours/WorkinghoursScreen.jsx';
import UsersScreen from './users/UsersScreen.jsx';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

export const mailFolderListItems = (
  <div>
	<Link to={"/takel/dashboard"} style={{textDecoration:'none'}}>
		<ListItem button>
		  <ListItemIcon>
			<DashboardIcon />
		  </ListItemIcon>
		  <ListItemText primary="Dashboard" />
		</ListItem>
	</Link>
	<Link to={"/takel/seasons"} style={{textDecoration:'none'}}>
		<ListItem button>
		  <ListItemIcon>
			<GroupWorkIcon />
		  </ListItemIcon>
		  <ListItemText primary="Saisonverwaltung" />
		</ListItem>
	</Link>
	<Link to={"/takel/hours"} style={{textDecoration:'none'}}>
		<ListItem button>
		  <ListItemIcon>
			<WorkIcon />
		  </ListItemIcon>
		  <ListItemText primary="Arbeitsstunden" />
		</ListItem>
	</Link>
	<Link to={"/takel/users"} style={{textDecoration:'none'}}>
		<ListItem button>
		  <ListItemIcon>
			<AccessibilityIcon />
		  </ListItemIcon>
		  <ListItemText primary="Benutzerverwaltung" />
		</ListItem>
	</Link>
  </div>
);

class MiniDrawer extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
				<TakelHeader />
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>{mailFolderListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
			<div>
				<AuthRoute exact path="/arbeitsstunden/takel/dashboard" component={DashboardScreen} />
				<AuthRoute exact path="/arbeitsstunden/takel/seasons" component={SeasonsScreen} />
				<AuthRoute exact path="/arbeitsstunden/takel/hours" component={WorkinghoursScreen} />
				<AuthRoute exact path="/arbeitsstunden/takel/users" component={UsersScreen} />
			</div>

        </main>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default class TakelScreen extends Component {
	render() {

		const DrawerComponent = withStyles(styles, { withTheme: true })(MiniDrawer);

		return (
			<DrawerComponent />
		);
	}
}
