import React from 'react';
import request from 'superagent';

import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import AppBar from 'material-ui/AppBar';
import Snackbar from 'material-ui/Snackbar';

import ProjectTable from './ProjectTable.jsx'

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
	constructor(props) {
		super(props);

		this.state = {
			anchorEl: null,
			open: false,
			snackbarOpen: false,
			currentYear: 0,
			availableSeasons: [],
			seasonLabels: null
		};

	};

	componentWillMount() {
        this.loadInitialProjects();
    };

	loadInitialProjects = () => {
        const endpoint = 'http://localhost:8081/api/projects/current';

        request.get(endpoint)
            .set('Content-Type', 'application/json')
            .then(success => {

				const body = success.body;

				const seasonLabels = body.seasons.reduce(function(map, obj) {
					map[obj.year] = obj.label;
					return map;
				}, {});

				this.setState({currentYear: body.currentYear, availableSeasons: body.seasons.sort(function (a,b) {return b.year - a.year}), seasonLabels: seasonLabels });
            }, failure => {
                console.error("Error: getting current projects (Response: ", failure.status, ")", failure);
				this.setState({ snackbarOpen: true});
            });
     }

	handleClick = event => {
		this.setState({ open: true, anchorEl: event.currentTarget });
	};

	handleRequestClose = (event) => {
		this.setState({ open: false });
	};

	handleSnackbarClose = (event) => {
		this.setState({ snackbarOpen: false });
	};

	handleMenuItemClick = (event, selectedYear) => {
		this.setState({ currentYear: selectedYear, open: false });
  	};

	render() {
		const { anchorEl, open, snackbarOpen, currentYear, availableSeasons, seasonLabels } = this.state;

			

		return (


			<Paper>
				<AppBar position='static'>
					<Toolbar>
						<Typography type="title" color="inherit" style={{flex:'1'}}>

					{availableSeasons.length > 0 && 
				
							<span>Projekte für Saison {seasonLabels[currentYear]}</span> 
					}
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
							{availableSeasons.map((availableYear, index) => {
								return (
									<MenuItem 
										key={availableYear.year} 
										selected={availableYear.year==currentYear}  
										onClick={event => this.handleMenuItemClick(event, availableYear.year)}
									>
										{availableYear.label}
									</MenuItem>
								);
							}, this)}
						</Menu>
					</Toolbar>	    	
				</AppBar>

				<ProjectTable projects={projectsData}/>

					 <Snackbar
					  anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
					  open={this.state.snackbarOpen}
					  SnackbarContentProps={{
						'aria-describedby': 'message-id',
					  }}
					  message={<span id="message-id">Fehler beim laden der Projekte. Versuche es später nochmal.</span>}
					  onRequestClose={this.handleSnackbarClose}
					/>

			</Paper>
		);
	}
}
