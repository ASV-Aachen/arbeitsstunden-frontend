import React from 'react';
import PropTypes from 'prop-types';

import { postAuthorized, getAuthorized } from '../HOC';
import API from '../../constants.js'

import CreateUserDialog from './CreateUserDialog.jsx';

export default class CreateUserDialogContainer extends React.Component {
	static propTypes = {
		userCreated: PropTypes.func.isRequired,
		userCanceled: PropTypes.func.isRequired,
		open: PropTypes.bool.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			seasons: [],
			currentSeason: -1,
			loading: false,
		};
	};

	componentDidMount(){
		this.loadSeasons();
	}

	loadSeasons = () => {
		if (!this.state.loading) {
			this.setState({
				loading: true,
			});

			getAuthorized(API.seasons, 
				(response) => {
					this.setState({
						loading: false,
					});
					const body = response.body;

					this.setState({
						currentSeason: body.activeSeason,
						seasons: body.seasons
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

					this.props.userCreated();

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

	render() {
		const { seasons, currentSeason } = this.state;
		const { open } = this.props;

		return (
				<CreateUserDialog 
					open={open} 
					onRequestCloseCanceled={this.props.userCanceled} 
					seasons={seasons} 
					currentSeason={currentSeason} 
					onCreateMember={this.handleCreateMember}
			/>
		);
	}
}



