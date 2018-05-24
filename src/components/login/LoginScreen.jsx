import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

import LoginContainer from './LoginContainer';

export default class LoginScreen extends Component {
	static isPublic = true;

	render() {
		return (
			<Grid 
				container
				justify='center'
				alignItems='center'
				direction='row'
				style={{height: '100vh'}}
			>	
				<LoginContainer />
			</Grid>
		);
	}
}
