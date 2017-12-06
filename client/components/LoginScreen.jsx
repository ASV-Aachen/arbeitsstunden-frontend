import React from 'react';
import { Redirect } from 'react-router'
import request from 'superagent';
import Cookies from 'universal-cookie';


import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';

import Login from './Login.jsx'
import { Config } from '../../config.js';

export default class LoginScreen extends React.Component {
	static isPublic = true;

	constructor(props){
		super(props);
		this.state={
			isLoading: false,
			isLoggedIn: false,
		}
	}

	handleLoginUser = (email, password) => {  
		this.setState({
			isLoading: true,
		});

		const endpoint = Config.baseurl + Config.endpoints.login;

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

				this.setState({
					isLoading: false,
					isLoggedIn: true,
				});

			}, failure => {
				if (failure.status == 401) {
					this.setState({
						unauthorizedSnackbarOpen: true,
					});	
				} else {
					console.log(failure);
					this.setState({ errorSnackbarOpen: true});
				}
				this.setState({
					isLoading: false,
					isLoggedIn: false,
				});
            });
	}

	handleRequestClose = () => {
		this.setState({ 
			errorSnackbarOpen: false,
			unauthorizedSnackbarOpen: false,
		});
	};

	render() {
		const { isLoading, isLoggedIn, errorSnackbarOpen, unauthorizedSnackbarOpen } = this.state;

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
						<Login onLogin={this.handleLoginUser} loading={isLoading} />
					</Paper> 
					<Snackbar
					  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
					  open={errorSnackbarOpen}
					  onRequestClose={this.handleRequestClose}
					  message={<span>Fehler, bei der Kommunikation mit dem Server.</span>}
					/>
					<Snackbar
					  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
					  open={unauthorizedSnackbarOpen}
					  onRequestClose={this.handleRequestClose}
					  message={<span>Falscher Benutzername oder Passwort. Probiere es noch mal!</span>}
					/>
					{isLoggedIn && <Redirect to="/" />}
				</Grid>
			</Grid>

		);
	}
}
