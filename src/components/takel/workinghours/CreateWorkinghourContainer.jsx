import React, { Component } from 'react';

import { withWidget, Title, getAuthorized, postAuthorized } from '../../HOC';

import CreateWorkinghour from './CreateWorkinghour.jsx';
import API from '../../../constants.js'

export default class CreateSeasonContainer extends Component {
	static propTypes = {
	};

	constructor(props) {
		super(props);
		this.state={
			loading: false,
			modalOpen: false,
			unauthorizedSnackbarOpen: false,
			activeSeason: 0,
			seasons: [],
			projects: [],
			users: [],
		}
	}

	TitleComponent = Title("Arbeitsstundeneintrag anlegen");
	CreateWorkinghourWidgetComponent = withWidget(CreateWorkinghour);

	componentDidMount(){
		this.loadSeasons();
		this.loadProjects();
		this.loadUsers();
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
						activeSeason: body.activeSeason,
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

	loadProjects = () => {
		if (!this.state.loading) {
			this.setState({
				loading: true,
			});

			getAuthorized(API.projects, 
				(response) => {
					this.setState({
						loading: false,
					});
					const body = response.body;

					this.setState({
						projects: body
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

	loadUsers = () => {
		if (!this.state.loading) {
			this.setState({
				loading: true,
			});

			getAuthorized(API.members + '/', 
				(response) => {
					this.setState({
						loading: false,
					});
					const body = response.body;

					this.setState({
						users: body
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

	saveWorkinghour = (payload) => {
		if (!this.state.loading) {
			this.setState({
				loading: true,
			});

			postAuthorized(API.project + '/', 
				payload,
				(response) => {
					this.setState({
						loading: false,
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

	handleSaveWorkinghour = (title, description, date, season, projectId, items) => {
		let data = {
			title: title,
			description: description,
			date: date,
			season: season,
			projectId: projectId,
			items: items,
		};

		this.saveWorkinghour(data)	
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

	render() {
		const { loading, modalOpen, unauthorizedSnackbarOpen, seasons, projects, activeSeason, users } = this.state;
		const CreateWorkinghourWidget = this.CreateWorkinghourWidgetComponent;

		return (
			<CreateWorkinghourWidget
				titleComponent={ this.TitleComponent } 
				loading = {loading}
				modalOpen={ modalOpen } 
				snackbarOpen={ unauthorizedSnackbarOpen }
				onSnackbarClose={this.handleSnackbarClose} 
				modalTitle={"Fehler bei der Kommunikation mit dem Server"}
				modalText={"Sollte das Problem anhalten melde dich bitte beim Takelmeister!"}
				onModalClose={this.handleModalClose} 
				activeSeason={activeSeason}
				seasons={seasons}
				projects={projects}
				users={users}
				onSaveWorkinghour={this.handleSaveWorkinghour}
				onUserCreated={this.loadUsers}
			/>	
		);
	}
}
