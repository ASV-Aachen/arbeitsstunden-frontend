import React from 'react';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

import Login from './Login.jsx'

export default class LoginScreen extends React.Component {

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
				<Grid item xs={10} sm={6} lg={4}>
					<Paper> 
						<Login />
					</Paper> 
				</Grid>
			</Grid>
		);
	}
}
