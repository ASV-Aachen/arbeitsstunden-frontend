import React from 'react';
import PropTypes from 'prop-types';

import { postAuthorized } from '../HOC';
import API from '../../constants.js'

import CreateUserDialog from './CreateUserDialog.jsx';

export default class CreateUserDialogContainer extends React.Component {
	static propTypes = {
		seasons: PropTypes.array.isRequired,
		currentSeason: PropTypes.number.isRequired,
		onUserCreated: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			open: true,
		};
	};

	handleCreateMember = (firstName, lastName, email, firstSeason, status) => {
			var userData = {
				firstName: firstName,
				lastName: lastName,
				email: email,
				firstSeason: firstSeason,
				status: status,
			};
			this.createMember(userData);
	}

	createMember = (payload) => {
		if (!this.state.loading) {
			this.setState({
				loading: true,
			});

			postAuthorized(API.members + '/', 
				payload,
				(response) => {
					this.setState({
						loading: false,
					});

					this.props.onUserCreated();

					this.setState({
						open: false,
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
				}
			);
		}
	} 

	handleCreateUserCloseCanceled = () => {
		this.setState({
			open: false,
		});
	};

	handleCreateUserCloseCreated = () => {
		//this.loadMembers();
		this.setState({
			open: false,
		});
	}

	render() {
		const { open } = this.state;
		const {seasons, currentSeason} = this.props;

		return (
				<CreateUserDialog 
			open={open} 
			onRequestCloseCanceled={this.handleCreateUserCloseCanceled} 
			onRequestCloseCreated={this.handleCreateUserCloseCreated} 
			seasons={seasons} 
			currentSeason={currentSeason} 
			onCreateMember={this.handleCreateMember}
			/>
		);
	}
}



