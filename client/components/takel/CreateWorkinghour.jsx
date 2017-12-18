import React from 'react';
import request from 'superagent';
import Cookies from 'universal-cookie';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Toolbar from 'material-ui/Toolbar';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import { LinearProgress } from 'material-ui/Progress';

import { Config } from '../../../config.js';
import SeasonPicker from '../SeasonPicker.jsx';
import ProjectPicker from '../ProjectPicker.jsx';
import UserPicker from '../UserPicker.jsx';

export default class CreateWorkinghour extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			activeStep: 0,
			projects: [],
			selectedProject: 'none',
			seasons: [],
			selectedSeason: 0,
			currentSeason: 0,
			title:'',
			description:'',
			date: '',

			selectedUsers: [],
			selectedWorkinghours: {},
		};
	};

	componentWillMount() {
		this.loadSeasons();
		this.loadMembers();
    };

	loadSeasons = () => {
		const endpoint = Config.baseurl + Config.endpoints.activeProjects;
		const cookies = new Cookies();
		let user = cookies.get('username');
		let pass = cookies.get('password');
		request.get(endpoint)
			.auth(user, pass)
			.set('Content-Type', 'application/json')
			.then(success => {
				const body = success.body; 

				this.setState({
					seasons: body.seasons,
					selectedSeason: body.activeYear,
					currentSeason: body.activeYear,
					projects: body.projects,
					loading:false, 
				});
			}, failure => {
				console.error("Error: getting seasons (Response: ", failure.status, ")", failure);
			});
	}

	loadMembers = () => {
		const endpoint = Config.baseurl + Config.endpoints.members;
		const cookies = new Cookies();
		let user = cookies.get('username');
		let pass = cookies.get('password');
		request.get(endpoint)
			.auth(user, pass)
			.set('Content-Type', 'application/json')
			.then(success => {
				const members = success.body;

				this.setState({
					members: members,
				});
			}, failure => {
				console.error("Error: getting members (Response: ", failure.status, ")", failure);
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

	textFieldChanged = (event) => {
		const id = event.target.id;
		const value = event.target.value;


		if (id == 'title') {
			this.setState({title: value});	
		} else if (id=='description') {
			this.setState({description: value});	
		} else if (id=='date') {
			this.setState({date: value});	
		}
	}

	handleWorkinghourSaved = () => {
		const { title, description, date, selectedSeason, selectedProject } = this.state;

		let items = this.state.selectedUsers.map((user, index) => {
			return (
				{
					memberId: user.id,
					duration: this.state.selectedWorkinghours[user.id]*60,
				}
			);
		});

		let data = {
			title: title,
			description: description,
			date: date,
			season: selectedSeason,
			projectId: selectedProject,
			items: items,
		};

		this.saveWorkinghour(data);
	}

	saveWorkinghour = (workinghourData) => {	
		if ( this.state.loading ) {
			return;
		}
		this.setState({loading: true});
		
		const endpoint = Config.baseurl + Config.endpoints.createWorkingHours;
		const cookies = new Cookies();
		let user = cookies.get('username');
		let pass = cookies.get('password');
		request.post(endpoint)
			.auth(user, pass)
			.send(workinghourData)
			.set('Content-Type', 'application/json')
			.then(success => {
				//TODO bestaetigung
				this.setState({
					loading: false,
				});
				location.reload();
			}, failure => {
				this.setState({
					loading: false,
				});
				console.error("Error: creating next seasons (Response: ", failure.status, ")", failure);
			});
	}

	getStepContent = (stepIndex) => {
		const { activeStep, currentSeason, selectedSeason, seasons, selectedProject, projects, members, title, description } = this.state;

		switch (stepIndex) {
			case 0:
				return (
						<div style={{padding:15}}>
							<SeasonPicker seasons={seasons} selected={selectedSeason} current={currentSeason} onChange={this.handleSeasonChanged}/>
							<br />
							<br />
							<ProjectPicker projects={projects} selected={selectedProject} onChange={this.handleSelectProject}/>
						</div>
				);	
			case 1:
				return (
						<div style={{padding:15}}>
							<Grid container>
								<Grid item xs={12} sm={12}>
									{this.renderTextField({name:'title', text:'Titel', required:true, multiline: false, onChange: this.textFieldChanged })}
								</Grid>
								<Grid item xs={12} sm={12}>
									{this.renderTextField({name:'description', text:'Beschreibung', required:false, multiline: true, onChange: this.textFieldChanged})}
								</Grid>
								<Grid item xs={12} sm={12}>
									<TextField 
										id='date'
										required
										label="Datum"
										type="date"
										fullWidth
										onChange={this.textFieldChanged}
										InputLabelProps={{
										  shrink: true,
										}}
									/>
								</Grid>
							</Grid>
						</div>
				);
			case 2:
				return (
						<div style={{padding:15}}>
							<UserPicker users={members} onChange={this.handleWorkinghourUpdate}/>
						</div>
				);
			case 3:
				return (
						<div style={{padding:15}}>
							<Typography><b>{ title }</b></Typography>
							<Typography>{ description.length ? description : "Keine Beschreibung" }</Typography>
							

							{this.state.selectedUsers.map((user, index) => {
								return (
									<Typography key={user.id} >
										{user.firstName} {user.lastName} {this.state.selectedWorkinghours[user.id]} Stunden
									</Typography>
								);
							})}
					
							<Button 
								raised 
								onClick={this.handleWorkinghourSaved} 
								style={{marginLeft:'auto', marginRight:'auto', display:'block'}}
							>
								Speichern
							</Button>
						</div>
				);
		}
	}

	handleWorkinghourUpdate = (users, workinghours) => {
		this.setState({
			selectedUsers: users,
			selectedWorkinghours: workinghours,
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

	getSteps = () => {
		return [
			'Arbeitsstunden Saison/Projekt auswählen',
			'Titel und Beschreibung',
			'Mitglieder und Stunden hinzufügen',
			'Zusammenfassung'
		];
	}
	
	render() {
		const { loading, activeStep } = this.state;
		const steps = this.getSteps();
		return (
			<Paper>
				<AppBar position='static'>
					<Toolbar>
						<Typography type="title" color="inherit" style={{flex:'1'}}>
							<span>Arbeitstundeneintrag anlegen</span> 
						</Typography>
					</Toolbar>
					{ loading && <LinearProgress /> }
				</AppBar>
				<Stepper activeStep={activeStep}>
					{steps.map((label, index) => {
						return (
							<Step key={label} >
								<StepLabel>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>
				<div style={{ padding:15 }}>
					<Grid container>
						<Grid item xs={6}>
							<Button
							  disabled={activeStep === 0}
							  onClick={this.handleBack}
							>
								Zurück
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button 
							  disabled={activeStep==steps.length-1}
							  raised 
							  color='primary' 
							  style={{float:'right'}}
							  onClick={this.handleNext} >
								Weiter
							</Button>
						</Grid>
					</Grid>
              </div>
				{this.getStepContent(activeStep)}
			</Paper>
		);
	}

	renderTextField = ({ name, text, required, multiline, onChange }) => {
		return (
			<FormControl required={required} style={{width: '100%'}}>
				<InputLabel htmlFor={name}>{text}</InputLabel>
				<Input id={name} multiline={multiline} onChange={onChange}/>
			</FormControl>
		);
	};
}
