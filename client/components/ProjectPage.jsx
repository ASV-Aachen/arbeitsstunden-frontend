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

const projectsData = [
	{
		id: '1',
		name: '470er Selvstarter',
		duration: 31,
	},
	{
		id: '2',
		name: 'AG IV',
		duration: 1689,
	},
	{
		id: '3',
		name: 'ASV Allgemein',
		duration: 57,
	},
	{
		id: '4',
		name: 'Ausbildung',
		duration: 290,
	},
	{
		id: '5',
		name: 'Cameron Dyas',
		duration: 49,
	},
	{
		id: '6',
		name: 'Dyas Rudolph Rotnase',
		duration: 247,
	},
	{
		id: '7',
		name: 'Etage',
		duration: 147.5,
	},
	{
		id: '8',
		name: 'Folkeboot Amme',
		duration: 1250,
	},
	{
		id: '9',
		name: 'Halle Aachen',
		duration: 1337,
	},

];

export default class ProjectPage extends React.Component {
	state = {
		anchorEl: null,
		open: false,
		selectedYear:  1,
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
							Projekte für Saison {availableYears[this.state.selectedYear].label} 
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
							{availableYears.map((availableYear, index) => {
								return (
									<MenuItem 
										key={availableYear.value} 
										selected={index==this.state.selectedYear}  
										onClick={this.handleRequestClose}
									>
											{availableYear.label}
									</MenuItem>
								);
							}, this)}
						</Menu>
					</Toolbar>	    	
				</AppBar>

				<ProjectTable projects={projectsData}/>

			</Paper>
		);
	}
}
