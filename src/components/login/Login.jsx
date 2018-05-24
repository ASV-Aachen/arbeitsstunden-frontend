import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

export default class Login extends Component {
	static propTypes = {
		onLogin: PropTypes.func.isRequired,
	};

	constructor(props){
		super(props);
		this.state={
			email: '',
			password: ''
		}
	}

	handleClick = (event) => {
		const { email, password } = this.state;
		this.props.onLogin(email, password);
	}

	render() {
		return (
			<div style={{width: 500}}>
				<FormControl 
					onChange = {(event) => this.setState({email:event.target.value})}
					style={{width: '100%'}}>
					<InputLabel htmlFor='email'>Email</InputLabel>
					<Input id='email' />
				</FormControl>
				<br />
				<br />
				<FormControl 
					onChange = {(event) => this.setState({password:event.target.value})}
					style={{width: '100%'}}>
					<InputLabel htmlFor='password'>Passwort</InputLabel>
					<Input type='password' id='password' />
				</FormControl>
				<br />
				<br />
				<Button 
					variant="raised"
					style={{marginLeft:'auto', marginRight:'auto', display:'block'}}
					onClick={(event) => this.handleClick(event)} >
					Anmelden	
				</Button>
			</div>
		);
	}
}
