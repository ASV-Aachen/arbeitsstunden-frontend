import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import LinearProgress from '@material-ui/core/LinearProgress';

import SeasonPicker from '../SimpleSeasonPicker.jsx';

export default class CreateUserDialog extends React.Component {
	static propTypes = {
		open: PropTypes.bool.isRequired,
		onRequestCloseCanceled: PropTypes.func.isRequired,
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

		if (Object.keys(validated).length === 0) {
			const {firstname, lastname, email, status, selectedSeason} = this.state;

			this.props.onCreateMember(firstname, lastname, email, selectedSeason, status);

		}
	};

	renderTextField = ({name, text, errors}) => {

		var error = '';
		if(errors && errors.hasOwnProperty(name)) {
			error = errors[name];
		}

		return (
			<FormControl required error={error !== ''} onChange={this.handleFormChange} style={{width: '100%'}}>
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
			<Dialog onClose={this.requestCloseCanceled} open={open}>

				<AppBar position='static'>
					<Toolbar>
						<Typography variant='title' color='inherit' style={{flex:'1'}}>
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
							Erste Saison:
							<SeasonPicker seasons={seasons} selected={selectedSeason} current={currentSeason} onChange={this.handleSeasonChanged}/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<Button variant='raised' onClick={this.handleCreateUser} style={{marginLeft:'auto', marginRight:'auto', display:'block'}}>
								Mitglied anlegen
							</Button>
						</Grid>
					</Grid>
				</div>
			</Dialog>
		);
	}
}



