import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

import { withWidget, Title, postAuthorized } from '../HOC';
import API from '../../constants.js'

import Dialog from '@material-ui/core/Dialog';

import MemberEdit from './MemberEdit.jsx';


export default class MemberEditDialogContainer extends Component {
	static propTypes = {
		open: PropTypes.bool.isRequired,
		handleClose: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		this.state={
			loading: false,
			modalOpen: false,
			snackbarOpen: false,
			seasons: [],
		}
	}

	componentDidMount(){

	}

	componentWillReceiveProps(props) {

	}

	postMemberUpdate = (newPassword) => {
		if (newPassword === undefined) {
			return;
		}

		if (!this.state.loading) {
			this.setState({
				loading: true,
			});

			postAuthorized(API.members + '/update',
				{
				    newPassword: newPassword
				},
				(response) => {
					this.setState({
						loading: false,
					});

					const cookies = new Cookies();
                    cookies.set('password', newPassword, { path: '/' });

					this.props.handleClose();
				}, 
				(response) => {
					this.setState({
						loading: false,
					});
					if (response.status === 401) {
						this.setState({
							snackbarOpen: true,
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

	handleStatusChange = (year, event) => {
		const updatedState = this.state.seasons.map(season => { 
			if (season.year === year) {
				return {...season,
						asvStatus: event.target.value 
					};
			} else {
				return season;
			}
		});

		this.setState({
				seasons: updatedState
		});
	}

	handleReductionChange = (year, event) => {
		const updatedState = this.state.seasons.map(season => { 
			if (season.year === year) {
				return {...season,
						reduction: event.target.value * 60 
					};
			} else {
				return season;
			}
		});

		this.setState({
				seasons: updatedState
		});
	}

	handleCancel = () => {
		this.props.handleClose();
	}

	handleEditUser = (newPassword) => {
		this.postMemberUpdate(newPassword);
	}

	

	MemberEditWidgetComponent = withWidget(MemberEdit);

	render() {
		const { loading, modalOpen, snackbarOpen, seasons } = this.state;
		const { open } = this.props;

		const title = "Passwort ändern";
		const TitleComponent = Title(title);
		const MemberEditWidget = this.MemberEditWidgetComponent;

		return (
			<Dialog onClose={this.props.handleClose} open={open}>

				<MemberEditWidget
					titleComponent={ TitleComponent } 
					loading = {loading}
					modalOpen={ modalOpen } 
					snackbarOpen={ snackbarOpen }
					onSnackbarClose={this.handleSnackbarClose} 
					modalTitle={"Fehler bei der Kommunikation mit dem Server"}
					modalText={"Sollte das Problem anhalten melde dich bitte beim Takelmeister!"}
					onModalClose={this.handleModalClose} 
					handleCancel={this.handleCancel}
					handleEditUser={this.handleEditUser} 

					seasons={seasons}
				/>	

			</Dialog>
		);
	}
}
