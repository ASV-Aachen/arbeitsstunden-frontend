import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withWidget, Title, getAuthorized, postAuthorized } from '../../HOC';
import API from '../../../constants.js'

import Dialog from '@material-ui/core/Dialog';

import MemberEdit from './MemberEdit.jsx';


export default class MemberEditDialogContainer extends Component {
	static propTypes = {
		open: PropTypes.bool.isRequired,
		member: PropTypes.object.isRequired,
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
		this.loadData(this.props.member.id);
	}

	componentWillReceiveProps(props) {
		this.loadData(props.member.id);
	}

	loadData = (memberId) => {  
		if (memberId === undefined) {
			return;
		}

		if (!this.state.loading) {
			this.setState({
				loading: true,
			});

			getAuthorized(API.member + '/' + memberId + '/seasons', 
				(response) => {
					this.setState({
						loading: false,
					});
					const body = response.body;

					this.setState({
						seasons: body
					});
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

	postReductionsAndStatus = (memberId, seasons) => {  
		if (memberId === undefined) {
			return;
		}

		if (!this.state.loading) {
			this.setState({
				loading: true,
			});

			postAuthorized(API.member + '/' + memberId + '/seasons', 
				seasons,
				(response) => {
					this.setState({
						loading: false,
					});

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

	handleEditUser = () => {
		this.postReductionsAndStatus(this.props.member.id, this.state.seasons);
	}

	handlePasswordReset = () => {
	    console.log(this.props.member);
	    this.postPasswordReset(this.props.member.id);
	}

	postPasswordReset = (memberId) => {
    		console.error("FUNKTION REMOVED")
    	}

	

	MemberEditWidgetComponent = withWidget(MemberEdit);

	render() {
		const { loading, modalOpen, snackbarOpen, seasons } = this.state;
		const { open, member } = this.props;

		const title = "Mitglied " + member.firstName + " " + member.lastName + " editieren";
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
					handleStatusChange={this.handleStatusChange}	
					handleReductionChange={this.handleReductionChange}	
					handleCancel={this.handleCancel} 
					handleEditUser={this.handleEditUser}
					handlePasswordReset={this.handlePasswordReset}

					seasons={seasons}
				/>	

			</Dialog>
		);
	}
}
