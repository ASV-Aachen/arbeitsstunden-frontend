import React from 'react';
import request from 'superagent';

import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Menu, { MenuItem } from 'material-ui/Menu';
import AppBar from 'material-ui/AppBar';
import Snackbar from 'material-ui/Snackbar';

export default class ProjectsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			anchorEl: null,
			open: false,
			snackbarOpen: false,
			createDialogOpen: false,
			currentProjects: null,
			selectedYear: 0,
			availableSeasons: [],
			seasonLabels: null
		};
	};

	componentWillMount() {
        this.loadInitialProjects();
    };

	loadInitialProjects = () => {
		const endpoint = Config.baseurl + Config.endpoints.activeProjects;

        request.get(endpoint)
            .set('Content-Type', 'application/json')
            .then(success => {

				const body = success.body;

				const seasonLabels = body.seasons.reduce(function(map, obj) {
					map[obj.year] = obj.label;
					return map;
				}, {});

				this.setState({
					currentProjects: body.projects,
					selectedYear: body.activeYear,
					availableSeasons: body.seasons.sort(function (a,b) {return b.year - a.year}),
					seasonLabels: seasonLabels
				});
            }, failure => {
                console.error("Error: getting current projects (Response: ", failure.status, ")", failure);
				this.setState({ snackbarOpen: true});
            });
     }

	loadProjects = (year) => {
		const endpoint = Config.baseurl + Config.endpoints.projects + year;
        request.get(endpoint)
            .set('Content-Type', 'application/json')
            .then(success => {

				const projects = success.body;

				this.setState({
					currentProjects: projects,
				});
            }, failure => {
                console.error("Error: getting projects (Response: ", failure.status, ")", failure);
				this.setState({ snackbarOpen: true});
            });
     }

	handleClick = event => {
		this.setState({ open: true, anchorEl: event.currentTarget });
	};

	handleClickAdd = event => {
		this.setState({ createDialogOpen: true});
	};


	handleRequestClose = (event) => {
		this.setState({ open: false });
	};

	handleSnackbarClose = (event) => {
		this.setState({ snackbarOpen: false, snackbarCreateOpen:false });
	};

	handleMenuItemClick = (event, selectedYear) => {
		this.setState({
			selectedYear: selectedYear,
			currentProjects: null,
			open: false,
		});

		this.loadProjects(selectedYear);
  	};

	handleRequestCreateDialogClose = () => {
		this.setState({ createDialogOpen: false});
	};

	handleRequestProjectCreated = () => {
		this.setState({
			createDialogOpen:false,
			snackbarCreateOpen: true
		});
	};

	render() {
		const { snackbarCreateOpen, createDialogOpen, anchorEl, open, snackbarOpen, currentProjects, selectedYear, availableSeasons, seasonLabels } = this.state;
		return (
			<Paper style={{position:'relative'}}>
			<CreateProjectDialog
			open={createDialogOpen}
			currentSeason={selectedYear}
			availableSeasons={availableSeasons}
			onRequestClose={this.handleRequestCreateDialogClose}
			onRequestCloseCreated={this.handleRequestProjectCreated}
			/>
			<AppBar position='static'>
			<Toolbar>
			<Typography type="title" color="inherit" style={{flex:'1'}}>

			{availableSeasons.length > 0 &&

				<span>Projekte für Saison {seasonLabels[selectedYear]}</span>
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
					selected={availableYear.year==selectedYear}
					onClick={event => this.handleMenuItemClick(event, availableYear.year)}
					>
					{availableYear.label}
					</MenuItem>
				);
			}, this)}
			</Menu>
			</Toolbar>
			</AppBar>
			<Button fab color="accent" aria-label="add" style={{position:'absolute',right:0}} onClick={this.handleClickAdd}>
			<AddIcon />
			</Button>
			Von Menu auf Select umsteigen!

			{currentProjects != null &&
				<ProjectTable projects={currentProjects} season={selectedYear} />
			}

			<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
			open={this.state.snackbarOpen}
			SnackbarContentProps={{
				'aria-describedby': 'message-id',
			}}
			message={<span id="message-id">Fehler beim laden der Projekte. Versuche es später nochmal.</span>}
			onRequestClose={this.handleSnackbarClose}
			/>

			<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
			open={snackbarCreateOpen}
			SnackbarContentProps={{
				'aria-describedby': 'message-id',
			}}
			message={<span id="message-id">Projekt wurde erfolgreich angelegt</span>}
			onRequestClose={this.handleSnackbarClose}
			/>

			</Paper>
		);
	}
}
