import React from 'react';
import PropTypes from 'prop-types';
import request from 'superagent';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import Input, { InputLabel } from 'material-ui/Input';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form'
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { CircularProgress } from 'material-ui/Progress';

export default class CreateProjectDialog extends React.Component {
	static propTypes = {
		onRequestClose: PropTypes.func.isRequired,
		onRequestCloseCreated:  PropTypes.func.isRequired,
		availableSeasons: PropTypes.array.isRequired,
		currentSeason: PropTypes.number.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			firstSeason: this.props.currentSeason
		};
	};

	componentWillReceiveProps(props) {

		this.state = {
			firstSeason: this.props.currentSeason
		};
	}

	requestCloseCanceled = () => {
		this.props.onRequestClose();
	};

	handleChange = (event) => {
		this.setState({firstSeason: event.target.value});
	};

	handleFormChange = (event) => {
		var newState = {[event.target.id]: event.target.value}
		this.setState(newState);

		const requiredFields = [ event.target.id ]
		var validated = this.validate(requiredFields, newState);
		this.setState({errors:validated});
	}

	validate = (requiredFields, values) => {
	  const errors = {}

	  requiredFields.forEach(field => {
	    if (!values[ field ]) {
	      errors[ field ] = 'Required'
	    }
	  })
	  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
	    errors.email = 'Invalid email address'
	  }
	  return errors
	}

	handleCreateProject = () => {

		const requiredFields = [ 'name', 'description' ]
		var validated = this.validate(requiredFields, this.state);
		this.setState({errors:validated});

		if (Object.keys(validated).length == 0) {
			const {name, description, firstSeason} = this.state;
			var projectData = {
				name: name,
				description: description,
			};
			this.createProject(projectData, firstSeason);
		}
	};

	createProject = (project, firstSeason) => {

        const endpoint = 'http://localhost:8081/api/projects/create/' + firstSeason;

        request.post(endpoint)
						.send(project)
            .set('Content-Type', 'application/json')
            .then(success => {

							var project = success.body;
							this.props.onRequestCloseCreated(project);

		         }, failure => {

							 	if (failure.status == 400) {
									var response = failure.response.body;
									this.setState({errors:{[response.field]:response.message}});
								} else {
									console.error("Error: getting projects (Response: ", failure.status, ")", failure);
								}
            });
  };

	renderTextField = ({name, text, errors}) => {

		var error = '';
		if(errors && errors.hasOwnProperty(name)) {
			error = errors[name];
		}

		return (
			<FormControl required error={error} onChange={this.handleFormChange} style={{width: '100%'}}>
				<InputLabel htmlFor={name}>{text}</InputLabel>
				<Input id={name} />
				<FormHelperText>{error}</FormHelperText>
			</FormControl>
		);

	};

	render() {
		const { open, availableSeasons, currentSeason } = this.props
		const { firstSeason, errors } = this.state

		return (
			<Dialog onRequestClose={this.requestCloseCanceled} open={open}>

				<AppBar position='static'>
					<Toolbar>
						<Typography type='title' color='inherit' style={{flex:'1'}}>
							<span>Projekt anlegen</span>
						</Typography>

					</Toolbar>
				</AppBar>

				<div style={{padding: 24}}>
					<Grid container spacing={24}>
						<Grid item xs={12} sm={12}>
							{this.renderTextField({name:'name', text:'Name', errors: errors})}
						</Grid>
						<Grid item xs={12} sm={12}>
							{this.renderTextField({name:'description', text:'Beschreibung', errors: errors})}
						</Grid>
						<Grid item xs={12} sm={12}>
							<FormControl style={{width:'100%'}}>
								<InputLabel htmlFor="first-season" >Erste Arbeitstunden Saison</InputLabel>
								<Select value={currentSeason} onChange={this.handleChange} input={<Input id="first-season" />} ref='firstSeason'>

									{availableSeasons.map((availableYear, index) => {
										return (
											<MenuItem
												key={availableYear.year}
												value={availableYear.year}
											>
												{availableYear.label}
											</MenuItem>
										);
									}, this)}
						 		</Select>
						  </FormControl>
						</Grid>
						<Grid item xs={12} sm={12}>
							<CircularProgress
								style={{position:'absolute', height:40, width:40, left:-20, marginLeft:'50%', zIndex: 10}}
							/>
							<Button raised onClick={this.handleCreateProject} style={{marginLeft:'auto', marginRight:'auto', display:'block'}}>
								Projekt anlegen
							</Button>
						</Grid>
					</Grid>
				</div>
			</Dialog>
		);
	}
}
