import React from 'react';
import request from 'superagent';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import MobileStepper from 'material-ui/MobileStepper';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

import { Config } from '../../../config.js';

import { LinearProgress } from 'material-ui/Progress';

export default class CreateWorkinghour extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			activeStep: 0,
		};
	};

	componentWillMount() {
    };

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
						</div>
				);	
			case 1:
				return (
						<div style={{padding:24}}>
						<Typography type="title">
							Titel und Beschreibung	
						</Typography>
						<br />
						</div>
				);
			case 2:
				return (
						<div style={{padding:24}}>
						<Typography type="title">
							Mitglieder und Stunden hinzufügen 
						</Typography>
						<br />
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
		const { loading, activeStep } = this.state;
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
	}
}
