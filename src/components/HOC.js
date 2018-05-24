import React, { Component } from 'react';
import request from 'superagent';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Modal from '@material-ui/core/Modal';

export const getCurrentMemberId = () => {
	const cookies = new Cookies();
	return cookies.get('memberId');
}

export const postUnauthorized = (endpoint, onSuccess, onFailure, username, password) => {
	request.post(endpoint)
		.auth(username, password)
		.set('Content-Type', 'application/json')
		.then(success => {
			onSuccess(success);
		}, failure => {
			onFailure(failure);
		});
}

export const getAuthorized = (endpoint, onSuccess, onFailure) => {
	const cookies = new Cookies();
	const username = cookies.get('username');
	const password = cookies.get('password');

	request.get(endpoint)
		.auth(username, password)
		.set('Content-Type', 'application/json')
		.then(success => {
			onSuccess(success);
		}, failure => {
			onFailure(failure);
		});
}

export const postAuthorized = (endpoint, body, onSuccess, onFailure) => {
	const cookies = new Cookies();
	const username = cookies.get('username');
	const password = cookies.get('password');

	request.post(endpoint)
		.send(body)
		.auth(username, password)
		.set('Content-Type', 'application/json')
		.then(success => {
			onSuccess(success);
		}, failure => {
			onFailure(failure);
		});
}

export function Title(title){ return <Typography variant='title' color="inherit">{title}</Typography>; } 

export const withWidget = (BaseComponent) =>
	class extends Component {
		static propTypes = {
			modalOpen: PropTypes.bool,
			titleComponent: PropTypes.object
		};

		static defaultProps = {
			modalOpen: false,
			titleComponent: Title('')
		};

		render() {
			const { titleComponent, loading, snackbarOpen, onSnackbarClose, modalText, modalTitle, modalOpen, onModalClose, ...otherProps } = this.props;

			return (<Paper style={{position: 'relative'}}>
						<AppBar position='static'>
							<Toolbar>
								{ titleComponent }
							</Toolbar>
							{loading && <LinearProgress /> }
						</AppBar>
						<div style={{padding:15}}>
							<BaseComponent {...otherProps} />
						</div>
						<Snackbar 
							anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}	
							style={{position: 'absolute', width: '100%'}}
							open={snackbarOpen} 
							autoHideDuration={4000}
							onClose={onSnackbarClose}
					  		message={<span>Falscher Benutzername oder Passwort. Probiere es noch mal!</span>}
							
						/>
						<Modal style={{}}
							open={modalOpen}
							onClose={onModalClose}
						>
							<div style={{top: '50%', left: '50%', transform: `translate(-${50}%, -${50}%)`,position: 'absolute', backgroundColor: 'white', padding: 15}}>
								<Typography variant="title">
									{modalTitle}
								</Typography>
								<Typography variant="subheading">
									{modalText}
								</Typography>
							</div>
						</Modal>
					</Paper>);
		}
	};
