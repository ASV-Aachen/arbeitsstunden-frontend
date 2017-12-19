import Cookies from 'universal-cookie';
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
import { LinearProgress } from 'material-ui/Progress';

import { Config } from '../../../config.js';

import SeasonPicker from '../SeasonPicker.jsx';

export default class CreateUserDialog extends React.Component {
	static propTypes = {
		onRequestCloseCanceled: PropTypes.func.isRequired,
		onRequestCloseCreated: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			status: 'PROSPECT',
			loading: false,
			selectedSeason: -1,
		};
	};

	componentWillReceiveProps(nextProps) {
		this.setState({
			selectedSeason: nextProps.currentSeason,
		});
	};	


	requestCloseCanceled = () => {
		this.props.onRequestCloseCanceled();
	};

	handleChange = (event) => {
		this.setState({status: event.target.value});
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

	handleCreateUser = () => {
		const requiredFields = [ 'firstname', 'lastname', 'email' ]
		var validated = this.validate(requiredFields, this.state);
		this.setState({errors:validated});

		if (Object.keys(validated).length == 0) {
			const {firstname, lastname, email, status, selectedSeason} = this.state;
			var userData = {
				firstName: firstname,
				lastName: lastname,
				email: email,
				firstSeason: selectedSeason,
				status: status,
			};
			this.createMember(userData);
		}
	};

	createMember = (member) => {
		if ( this.state.loading ) {
			return;
		}
		this.setState({loading: true});

		const endpoint = Config.baseurl + Config.endpoints.memberCreate;
		const cookies = new Cookies();
		let user = cookies.get('username');
		let pass = cookies.get('password');
		request.post(endpoint)
			.auth(user, pass)
			.send(member)
			.set('Content-Type', 'application/json')
			.then(success => {

				this.props.onRequestCloseCreated();

				this.setState({loading: false,});
			}, failure => {
				if (failure.status == 400) {
					var response = failure.response.body;
					this.setState({
						loading: false, 
						errors:{[response.field]:response.message}}
					);
				} else {
					console.error("Error: creating member (Response: ", failure.status, ")", failure);
					this.setState({loading: false,});
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

	handleSeasonChanged = (newSelectedSeason) => {
		this.setState({
			selectedSeason: newSelectedSeason
		});
	}

	render() {
		const { open, seasons, currentSeason } = this.props;
		const { status, errors, loading, selectedSeason } = this.state;

		return (
			<Dialog onRequestClose={this.requestCloseCanceled} open={open}>

				<AppBar position='static'>
					<Toolbar>
						<Typography type='title' color='inherit' style={{flex:'1'}}>
							<span>Mitglied anlegen</span>
						</Typography>

					</Toolbar>
					{ loading && <LinearProgress /> }
				</AppBar>

				<div style={{padding: 24}}>
					<Grid container spacing={24}>
						<Grid item xs={12} sm={6}>
							{this.renderTextField({name:'firstname', text:'Vorname', errors: errors})}
						</Grid>
						<Grid item xs={12} sm={6}>
							{this.renderTextField({name:'lastname', text:'Nachname', errors: errors})}
						</Grid>
						<Grid item xs={12} sm={12}>
							{this.renderTextField({name:'email', text:'Email', errors: errors})}
						</Grid>
						<Grid item xs={12} sm={12}>
							<FormControl style={{width:'100%'}}>
								<InputLabel htmlFor="asv-status" >Aktueller Status</InputLabel>
								<Select value={status} onChange={this.handleChange} input={<Input id="asv-status" />} ref='status'>
									<MenuItem value={"PROSPECT"}>Anwärter</MenuItem>
									<MenuItem value={"ACTIVE"}>Aktiv</MenuItem>
									<MenuItem value={"INACTIVE"}>Inaktiv</MenuItem>
									<MenuItem value={"OLD_MAN"}>Alter Herr</MenuItem>
									<MenuItem value={"GUEST"}>Gast</MenuItem>
									<MenuItem value={"QUIT"}>Ausgetreten</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={12}>
							<SeasonPicker seasons={seasons} selected={selectedSeason} current={currentSeason} onChange={this.handleSeasonChanged}/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<Button raised onClick={this.handleCreateUser} style={{marginLeft:'auto', marginRight:'auto', display:'block'}}>
								Mitglied anlegen
							</Button>
						</Grid>
					</Grid>
				</div>
			</Dialog>
		);
	}
}
