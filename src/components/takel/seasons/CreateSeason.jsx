import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Stepper from '@material-ui/core/Stepper'; 
import Step from '@material-ui/core/Step'; 
import StepLabel from '@material-ui/core/StepLabel'; 
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default class CreateSeason extends Component {
	static propTypes = {
		nextSeason: PropTypes.number.isRequired,
		onNewObligatoryHours: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			activeStep: 0,
			obligatoryHours: 50,
		};
	};

	getSteps = () => {
		return [
			'Beschreibung',
			'Pflichtarbeitsstunden Festlegen',
			'Bestätigung',
			'Zusammenfassung'
		];
	}

	handleSeasonCreated = () => {
		this.setState({
			activeStep: this.state.activeStep + 1,
		});	
	}

	handleNext = () => {
		if (this.state.activeStep === 2) {
			this.props.onNewObligatoryHours(
				this.props.nextSeason, 
				this.state.obligatoryHours,
				this.handleSeasonCreated
			);
		} else {
			this.setState({
				activeStep: this.state.activeStep + 1,
			});	
		}
	}

	handleBack = () => {
		this.setState({
			activeStep: this.state.activeStep - 1,
  		});	
	}

	getStepContent = (stepIndex) => {
		const { nextSeason } = this.props;
		const { obligatoryHours } = this.state;

		switch (stepIndex) {
			case 0:
				return (
						<div style={{padding:15}}>
							<Typography paragraph>
								Hier kann die neue Arbeitsstundensaison <b>{ nextSeason -1 }/{ nextSeason }</b> angelegt werden.</Typography>
							<Typography paragraph>
								<b>Achtung:</b> Eine falsch angelegte Arbeitstundensaison kann nur mit sehr viel manuellem Aufwand Rückgängig gemacht werden! Eine neue Arbeitsstundensaison sollte nur angelegt werden, wenn die Pflichtarbeitsstunden final von dem Takelmeister festegelegt wurden!
							</Typography>
								
						</div>
				);	
			case 1:
				return (
						<div style={{padding:15}}>
							<Typography paragraph>
								Pflichtarbeitsstunden für Arbeitsstundensaison <b>{ nextSeason -1 }/{ nextSeason }</b> festlegen</Typography>

							<TextField
								id='obligatoryHours'
								fullWidth
								label={'Pflichtarbeitsstunden'}
								type='number'
								defaultValue='50'
								onChange={(event)=>{this.setState({obligatoryHours: event.target.value,})}}
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</div>
				);
			case 2:
				return (
						<div style={{padding:15}}>
							<Typography paragraph>
								Wenn du auf 'WEITER' drückst, wird die <b>Arbeitsstundensaison {nextSeason-1}/{nextSeason}</b> mit <b>{obligatoryHours} Pflichtarbeitsstunden</b> angelegt. Dies kann nur mit sehr viel manuellem Aufwand Rückgängig gemacht werden. Bestätige also nur, wenn du dir sicher bist, dass die Saison sowie die Pflichtarbeitsstunden richtig sind.
							</Typography>
						</div>
				);
			case 3:
				return (
						<div style={{padding:15}}>
							<Typography>
								Arbeitsstundensaison <b>{nextSeason-1}/{nextSeason}</b> mit <b>{obligatoryHours} Pflichtarbeitsstunden</b> wurde erfolgreich angelegt.
							</Typography>
						</div>
				);
			default:
				return (
					<div>Missing Step, implement me!</div>
				);
		}
	}

	render() {
		const { activeStep } = this.state;

		const steps = this.getSteps();

		return (
			<div>
				<Stepper activeStep={activeStep}>
				{ steps.map((label, index) => { 
					return (
						<Step key={label} >
							<StepLabel>{label}</StepLabel>
						</Step>);
				}
				)}
				</Stepper>
				
				<div style={{ padding:15 }}>
						<Grid container>
							<Grid item xs={6}>
								<Button
								  disabled={activeStep === 0 || activeStep === steps.length-1}
								  onClick={this.handleBack}
								>
									Zurück
								</Button>
							</Grid>
							<Grid item xs={6}>
								<Button 
								  disabled={activeStep===steps.length-1}
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
}
