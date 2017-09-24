import React from 'react';

import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import AppBar from 'material-ui/AppBar';
import ProjectTable from './ProjectTable.jsx'


  const availableYears = [
  {
    value: '2015',
    label: '2015/2016',
  },
  {
    value: '2016',
    label: '2016/2017',
  },
  {
    value: '2017',
    label: '2017/2018',
  }
  ];

export default class ProjectPage extends React.Component {
  state = {
    anchorEl: null,
    open: false,
    currentYear:  0,
  };

   handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
	<Paper>
	    <AppBar position='static'>
		<Toolbar>
			<Typography type="title" color="inherit" style={{flex:'1'}}>
				Projekte für Saison {availableYears[this.state.currentYear].label} 
			</Typography>
			
	    		<Button raised 
				  aria-owns={this.state.open ? 'simple-menu' : null}
				  aria-haspopup="true"
				  onClick={this.handleClick}
				>
					Saison wählen 
				</Button>
				<Menu
				  id="simple-menu"
				  anchorEl={this.state.anchorEl}
				  open={this.state.open}
				  onRequestClose={this.handleRequestClose}
				>
					{availableYears.map(availableYear => {
				    return (
				  	<MenuItem key={availableYear.value} onClick={this.handleRequestClose}>{availableYear.label}</MenuItem>
				    );
				  }, this)}

				</Menu>

        	</Toolbar>	    	
	    </AppBar>

	    <ProjectTable />
	</Paper>
    );
  }
}
