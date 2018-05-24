import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router';

import Login from './Login';
import { withWidget, Title, postUnauthorized } from '../HOC';

import API from '../../constants.js';

export default class LoginContainer extends Component {
	
	constructor(props) {
		super(props);
		this.state={
			loading: false,
			isLoggedIn: false,
			unauthorizedSnackbarOpen: false,
			modalOpen: false,
		}
	}

	handleLoginUser = (username, password) => {  
		if (!this.state.loading) {
			this.setState({
				loading: true,
			});
			postUnauthorized(API.login, 
				(response) => {
					const cookies = new Cookies();
					cookies.set('token', response.body.token, { path: '/' });
					cookies.set('role', response.body.role, { path: '/' });
					cookies.set('memberId', response.body.memberId, { path: '/' });
					cookies.set('username', username, { path: '/' });
					cookies.set('password', password, { path: '/' });

					this.setState({
						loading: false,
						isLoggedIn: true
					});

				}, 
				(response) => {
					this.setState({
						loading: false,
					});
					if (response.status === 401) {
						this.setState({
							unauthorizedSnackbarOpen: true,
						});	
					} else {
						this.setState({
							modalOpen: true,
						});
						console.error("Server replied: " + response);
					}
				}, 
				username,
				password
			);
		}
	}

	handleSnackbarClose = () => {
		this.setState({
			unauthorizedSnackbarOpen: false,
		});
	}

	handleModalClose = () => {
		this.setState({
			modalOpen: false,
		});
	}

	TitleComponent = Title("Login");
	LoginWidgetComponent = withWidget(Login);

	render() {
		const { loading, unauthorizedSnackbarOpen, modalOpen, isLoggedIn } = this.state;
		const LoginWidget = this.LoginWidgetComponent;
		return (
			<div>
				{!isLoggedIn ? ( 
					<LoginWidget 
						onLogin={this.handleLoginUser} 
						loading={loading}
						snackbarOpen={unauthorizedSnackbarOpen} 
						onSnackbarClose={this.handleSnackbarClose} 
						modalTitle={"Fehler bei der Kommunikation mit dem Server"}
						modalText={"Sollte das Problem anhalten melde dich bitte beim Takelmeister!"}
						modalOpen={modalOpen} 
						onModalClose={this.handleModalClose} />
				) : (
					<Redirect to="/member" />
				)}
			</div>
		);
	}
}
