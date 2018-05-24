import React, { Component } from 'react';

import { withWidget, Title, getAuthorized, postAuthorized } from '../../HOC';

import CreateSeason from './CreateSeason.jsx';
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
			nextSeason: 0,
		}
	}

	TitleComponent = Title("Arbeitsstundensaison anlegen");
	CreateSeasonWidgetComponent = withWidget(CreateSeason);

	componentDidMount(){
		this.loadData();
	}

	loadData = () => {  
		if (!this.state.loading) {
			this.setState({
				loading: true,
			});

			getAuthorized(API.seasons + '/next', 
				(response) => {
					this.setState({
						loading: false,
					});
					const body = response.body;

					this.setState({
						nextSeason: body.nextSeason,
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

	handleNewObligatoryHours = (season, obligatoryHours, onSuccess) => {
		if (!this.state.loading) {
			this.setState({
				loading: true,
			});

			const body = {
				year: season,
    			obligatoryMinutes: obligatoryHours*60
			};

			postAuthorized(API.seasons, 
				body,
				(response) => {
					this.setState({
						loading: false,
					});
					onSuccess();
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
		const { loading, modalOpen, unauthorizedSnackbarOpen, nextSeason } = this.state;
		const CreateSeasonWidget = this.CreateSeasonWidgetComponent;

		return (
			<CreateSeasonWidget
				titleComponent={ this.TitleComponent } 
				loading = {loading}
				modalOpen={ modalOpen } 
				snackbarOpen={ unauthorizedSnackbarOpen }
				onSnackbarClose={this.handleSnackbarClose} 
				modalTitle={"Fehler bei der Kommunikation mit dem Server"}
				modalText={"Sollte das Problem anhalten melde dich bitte beim Takelmeister!"}
				onModalClose={this.handleModalClose} 
				nextSeason={nextSeason}
				onNewObligatoryHours={this.handleNewObligatoryHours}
			/>	
		);
	}
}
