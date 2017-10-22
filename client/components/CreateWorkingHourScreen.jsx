import React from 'react';
import Request from 'superagent';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import MobileStepper from 'material-ui/MobileStepper';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';


import ProjectPicker from './ProjectPicker.jsx';
import SeasonPicker from './SeasonPicker.jsx';
import UserPicker from './UserPicker.jsx';

import { Config } from '../../config.js';

export default class CreateWorkingHourPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeStep: 0,
			users: [],
			seasons: [],
			selectedSeason: 0,
			currentSeason: 0,
			projects:[],
			selectedProject:'none',
		};
	};

	componentWillMount() {
		this.loadSeasons();
		this.loadProjects();
		this.loadUsers();
	};

	loadSeasons = () => {
		const endpoint = Config.baseurl + Config.endpoints.seasons;
		Request.get(endpoint)
			.set('Content-Type', 'application/json')
			.then(success => {
				const { current, seasons } = success.body; 
				this.setState({
					seasons: seasons,
					selectedSeason: current,
					currentSeason: current
				});
			}, failure => {
				console.error("Error: getting seasons (Response: ", failure.status, ")", failure);
			});
	}

	loadProjects = () => {
		const endpoint = Config.baseurl + Config.endpoints.projects;
		Request.get(endpoint)
			.set('Content-Type', 'application/json')
			.then(success => {
				const projects = success.body; 
				this.setState({
					projects: projects
				});
			}, failure => {
				console.error("Error: getting projects (Response: ", failure.status, ")", failure);
			});
	}

	loadUsers = () => {
		const endpoint = Config.baseurl + Config.endpoints.users;
		Request.get(endpoint)
			.set('Content-Type', 'application/json')
			.then(success => {
				const users = success.body;
				this.setState({
					users: users,
				});
			}, failure => {
				console.error("Error: getting projects (Response: ", failure.status, ")", failure);
			});
	}

	handleSeasonChanged = (newSelectedSeason) => {
		this.setState({
			selectedSeason: newSelectedSeason
		});
	}

	handleSelectProject = (selectedProject) => {
		this.setState({
			selectedProject: selectedProject 
		});
	}

	handleNext = () => {
		this.setState({
      		activeStep: this.state.activeStep + 1,
    	});	
	}

	handleBack = () => {
		this.setState({
      		activeStep: this.state.activeStep - 1,
    	});	
	}

	getStepContent = (stepIndex) => {
		const { activeStep, currentSeason, selectedSeason, seasons, selectedProject, projects, users } = this.state;

		switch (stepIndex) {
			case 0:
				return (
						<div style={{padding:24}}>
							<Typography type="title">
								Arbeitsstunden Saison & Projekt auswählen
							</Typography>
							<br />
							<SeasonPicker seasons={seasons} selected={selectedSeason} current={currentSeason} onChange={this.handleSeasonChanged}/>
							<br />
							<br />
							<ProjectPicker projects={projects} selected={selectedProject} onChange={this.handleSelectProject}/>
						</div>
				);	
			case 1:
				return (
						<div style={{padding:24}}>
						<Typography type="title">
							Titel und Beschreibung	
						</Typography>
						<br />
						<Grid container>
							<Grid item xs={12} sm={12}>
								{this.renderTextField({name:'title', text:'Titel', required:true, multiline: false})}
							</Grid>
							<Grid item xs={12} sm={12}>
								{this.renderTextField({name:'description', text:'Beschreibung', required:false, multiline: true})}
							</Grid>
						</Grid>
						</div>
				);
			case 2:
				return (
						<div style={{padding:24}}>
						<Typography type="title">
							Mitglieder und Stunden hinzufügen 
						</Typography>
						<br />
						<UserPicker users={users} />
						</div>
				);
			case 3:
				return (
						<div style={{padding:24}}>
						<Typography type="title">
							Zusammenfassung 
						</Typography>
						<br />
						Speichern
						</div>
				);
		}
	}

	render() {
		const { activeStep, currentSeason, selectedSeason, seasons, selectedProject, projects, users } = this.state;

		return (
			<Paper>
				<AppBar position='static'>
					<Toolbar>
						<Typography type='title' color='inherit' style={{flex:'1'}}>
							<span>Arbeitstundeneintrag anlegen</span> 
						</Typography>
					</Toolbar>	    	
				</AppBar>

			<MobileStepper
				type="progress"
				steps={4}
				position="static"
				activeStep={activeStep}
				nextButton={
					<Button dense onClick={this.handleNext} disabled={activeStep === 3}>
					Next
					{<KeyboardArrowRight />}
					</Button>
				}
				backButton={
					<Button dense onClick={this.handleBack} disabled={activeStep === 0}>
					{<KeyboardArrowLeft />}
					Back
					</Button>
				}
			/>

			{this.getStepContent(activeStep)}

			</Paper>
		);
	};

	renderTextField = ({ name, text, required, multiline }) => {
		return (
			<FormControl required={required} style={{width: '100%'}}>
				<InputLabel htmlFor={name}>{text}</InputLabel>
				<Input id={name} multiline={multiline}/>
			</FormControl>
		);
	};
}
