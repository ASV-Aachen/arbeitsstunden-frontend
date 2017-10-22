import React from 'react';
import request from 'superagent';
import Cookies from 'universal-cookie';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

import Login from './Login.jsx'

export default class LoginScreen extends React.Component {
	static isPublic = true;

	handleLoginUser = (email, password) => {  
        const endpoint = 'http://localhost:8081/api/session';

		const credentials = {
			email: email, 
			password: password
		};

        request.post(endpoint)
			.send(credentials)
            .set('Content-Type', 'application/json')
            .then(success => {
				const session = success.body;
				const cookies = new Cookies();
				cookies.set('token', session.token, { path: '/' });
			}, failure => {
				console.error("Error: getting session", failure);
            });
	}

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
						<Login onLogin={this.handleLoginUser} />
					</Paper> 
				</Grid>
			</Grid>
		);
	}
}
