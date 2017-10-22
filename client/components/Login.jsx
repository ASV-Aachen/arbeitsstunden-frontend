import React from 'react';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form'
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

export default class Login extends React.Component {
	static propTypes = {
		onLogin: PropTypes.func.isRequired,
	};

	constructor(props){
		super(props);
		this.state={
			email:'',
			password:''
		}
	}

	handleClick = (event) => {
		const { email, password } = this.state;
		this.props.onLogin(email, password);
	}

	render() {
		return (
			<div>
				<AppBar position='static'>
					<Toolbar>
						<Typography type='title' color='inherit' style={{flex:'1'}}>
							<span>Login</span>
						</Typography>

					</Toolbar>
				</AppBar>
				<div style={{padding:24}}>
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
						<Input id='password' />
					</FormControl>
					<br />
					<br />
					<Button 
						raised
						style={{marginLeft:'auto', marginRight:'auto', display:'block'}}
						onClick={(event) => this.handleClick(event)} >
						Einloggen	
					</Button>
				</div>
			</div>
		);
	}
}