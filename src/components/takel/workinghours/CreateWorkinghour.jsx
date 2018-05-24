import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

import UserPicker from '../UserPicker.jsx';
import SeasonPicker from '../../SimpleSeasonPicker.jsx';
import ProjectPicker from '../ProjectPicker.jsx';
import CreateUserDialogContainer from '../CreateUserDialogContainer.jsx';

export default class CreateWorkinghour extends Component {
	static propTypes = {
		activeSeason: PropTypes.number.isRequired,
		seasons: PropTypes.array.isRequired,
		projects: PropTypes.array.isRequired,
		users: PropTypes.array.isRequired,
		onSaveWorkinghour: PropTypes.func.isRequired,
		onUserCreated: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			activeStep: 0,
			selectedSeason: this.props.activeSeason,
			selectedProject: 'none',
			title:'',
			description:'',
			date: '',
			createUserDialogOpen: false,
		};
	};

	componentWillReceiveProps(newProps){
      if (this.state.selectedSeason === 0) {
		  this.setState({
		  	selectedSeason: newProps.activeSeason,
			selectedUsers: [] 
		  });
      }
	}

	handleSeasonChanged = (newSelectedSeason) => {
		this.setState({
			selectedSeason: newSelectedSeason
		});
	}

	handleProjectChanged = (newSelectedProject) => {
		this.setState({
			selectedProject: newSelectedProject
		});
	}

	handleWorkinghourUpdate = (users, workinghours) => {
		this.setState({
			selectedUsers: users,
			selectedWorkinghours: workinghours,
		});
	}

	getStepContent = (stepIndex) => {
		const { seasons, projects, activeSeason, users } = this.props;

		const { selectedProject, selectedSeason, title, description, createUserDialogOpen } = this.state;

		switch (stepIndex) {
			case 0:
				return (
						<div style={{padding:15}}>
							<SeasonPicker seasons={seasons} selected={selectedSeason} current={activeSeason} onChange={this.handleSeasonChanged}/>
							<br />
							<br />
							<ProjectPicker projects={projects} selected={selectedProject} onChange={this.handleProjectChanged}/>
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
						<div style={{padding:15, position:'relative',}}>
							<Button variant="fab" color="primary" aria-label="add" style={{position:'absolute', top: 180, right:35, zIndex:1000}} onClick={()=>{this.setState({createUserDialogOpen: true,})}}>
								<AddIcon />
						  	</Button>
							<UserPicker users={users} onChange={this.handleWorkinghourUpdate}/>

					{ createUserDialogOpen &&	<CreateUserDialogContainer open={createUserDialogOpen} seasons={seasons} currentSeason={activeSeason} onUserCreated={this.props.onUserCreated} /> } 
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
					
							<Button variant="raised" 
								onClick={this.saveWorkingHour} 
								style={{marginLeft:'auto', marginRight:'auto', display:'block'}}
							>
								Speichern
							</Button>
						</div>
				);
			default:
				return (<div>step {stepIndex} not implemented yet</div>);
		}
	}

	saveWorkingHour = () => {
		const { title, description, date, selectedSeason, selectedProject } = this.state;

		let items = this.state.selectedUsers.map((user, index) => {
			return (
				{
					memberId: user.id,
					duration: this.state.selectedWorkinghours[user.id]*60,
				}
			);
		});


		this.props.onSaveWorkinghour(title, description, date, selectedSeason, selectedProject, items);

		this.setState({
			activeStep: 0,
			selectedSeason: this.props.activeSeason,
			selectedProject: 'none',
			title:'',
			description:'',
			date: '',
		});
		
	}

	textFieldChanged = (event) => {
		const id = event.target.id;
		const value = event.target.value;


		if (id === 'title') {
			this.setState({title: value});	
		} else if (id === 'description') {
			this.setState({description: value});	
		} else if (id === 'date') {
			this.setState({date: value});	
		}
	}

	getSteps = () => {
		return [
			'Arbeitsstunden Saison/Projekt auswählen',
			'Titel und Beschreibung',
			'Mitglieder und Stunden hinzufügen',
			'Zusammenfassung'
		];
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

	render() {
		const { activeStep } = this.state;
		const steps = this.getSteps();

		return (
			<div>
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
							  disabled={activeStep === steps.length-1}
							  variant='raised'
							  color='primary' 
							  style={{float:'right'}}
							  onClick={this.handleNext} >
								Weiter
							</Button>
						</Grid>
					</Grid>
              </div>
				{this.getStepContent(activeStep)}
			</div>
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
