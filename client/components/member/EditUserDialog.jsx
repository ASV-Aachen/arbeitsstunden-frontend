import React from 'react';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';
import request from 'superagent';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import Input, { InputLabel } from 'material-ui/Input';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { FormControl, FormHelperText } from 'material-ui/Form'
import { LinearProgress } from 'material-ui/Progress';
import Snackbar from 'material-ui/Snackbar';

import { Config } from '../../../config.js';

export default class EditUserDialog extends React.Component {
	static propTypes = {
		onRequestCloseCanceled: PropTypes.func.isRequired,
		onRequestCloseSaved: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			loading: false,	
			savedSnackbarOpen: false,
		};
	};

	requestCloseCanceled = () => {
		this.props.onRequestCloseCanceled();
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

		const cookies = new Cookies();
		let pass = cookies.get('password');

		if (values.currentPasswort && values.currentPasswort != pass) {
			errors.currentPasswort= 'Falsches Passwort'
		}

		if (values.newPassword && values.newPasswordRepeat && values.newPassword != values.newPasswordRepeat) {
			errors.newPassword = 'Passwort stimmt nicht überein';
			errors.newPasswordRepeat = 'Passwort stimmt nicht überein';
		}

		return errors
	}

	renderTextField = ({name, text, errors}) => {

		var error = '';
		if(errors && errors.hasOwnProperty(name)) {
			error = errors[name];
		}

		return (
			<FormControl required error={error} onChange={this.handleFormChange} style={{width: '100%'}}>
				<InputLabel htmlFor={name}>{text}</InputLabel>
				<Input type='password' id={name} />
				<FormHelperText>{error}</FormHelperText>
			</FormControl>
		);

	};

	handleEdit = () => {
		const requiredFields = [ 'currentPassword', 'newPassword', 'newPasswordRepeat' ]
		var validated = this.validate(requiredFields, this.state);
		this.setState({errors: validated});

		if (Object.keys(validated).length == 0) {
			const { newPassword } = this.state;
			var userData = {
				newPassword: newPassword,
			};
			this.updateMember(userData);
		}
	};
	
	updateMember = (member) => {
		if ( this.state.loading ) {
			return;
		}
		this.setState({loading: true});

		const endpoint = Config.baseurl + Config.endpoints.memberUpdate;
		const cookies = new Cookies();
		let user = cookies.get('username');
		let pass = cookies.get('password');
		request.post(endpoint)
			.auth(user, pass)
			.send(member)
			.set('Content-Type', 'application/json')
			.then(success => {
				this.props.onRequestCloseSaved();

				const cookies = new Cookies();
				cookies.set('password', member.newPassword);

				this.setState({
					loading: false,
					savedSnackbarOpen: true,
				});
			}, failure => {
					console.error("Error: updating member (Response: ", failure.status, ")", failure);
					this.setState({loading: false,});
			});
	};

	handleRequestClose = () => {
		this.setState({ 
			savedSnackbarOpen: false,
		});
	};

	render() {
		const { open } = this.props;
		const { loading, errors, savedSnackbarOpen } = this.state;

		return (
			<span>
			<Dialog onRequestClose={this.requestCloseCanceled} open={open}>

				<AppBar position='static'>
					<Toolbar>
						<Typography type='title' color='inherit' style={{flex:'1'}}>
							<span>Meine Daten editieren</span>
						</Typography>

					</Toolbar>
					{ loading && <LinearProgress /> }
				</AppBar>

				<div style={{padding: 24}}>
					<Grid container spacing={24}>
						<Grid item xs={12} sm={12}>
							{this.renderTextField({name:'currentPassword', text:'Bisheriges Passwort', errors: errors})}
						</Grid>
						<Grid item xs={12} sm={12}>
							{this.renderTextField({name:'newPassword', text:'Neues Passwort', errors: errors})}
						</Grid>
						<Grid item xs={12} sm={12}>
							{this.renderTextField({name:'newPasswordRepeat', text:'Passwort Wiederholen', errors: errors})}
						</Grid>
						<Grid item xs={12} sm={12}>
							<Button raised onClick={this.handleEdit} style={{marginLeft:'auto', marginRight:'auto', display:'block'}}>
								Passwort ändern	
							</Button>
						</Grid>
					</Grid>
				</div>
			</Dialog>
			<Snackbar
			  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			  open={savedSnackbarOpen}
			  onRequestClose={this.handleRequestClose}
			  message={<span>Daten wurden erfolgreich gespeichert.</span>}
			/>
			</span>
		);
	}
}
