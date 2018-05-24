import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withWidget, Title, getAuthorized } from '../HOC';
import MemberDetails from './MemberDetails.jsx';
import API from '../../constants.js'

export default class MemberDetailsContainer extends Component {
	static propTypes = {
		memberId: PropTypes.string.isRequired
	};

	constructor(props) {
		super(props);
		this.state={
			loading: false,
			modalOpen: false,
			unauthorizedSnackbarOpen: false,
			firstName: '',
			lastName: '',
			email: '',
			intervals: []
		}
	}

	componentDidMount(){
		this.loadData();
	}

	createIntervals = (reductions) => {
		let intervals = [];
		let lastStatus = undefined;

		reductions.forEach((item) => {
			if(item.reduction === 0 && item.asvStatus === lastStatus) {
				intervals[intervals.length-1]['to'] = item.year;
			} else {
				lastStatus = item.asvStatus;
				if(item.reduction > 0) {
					lastStatus = undefined
				}
				intervals.push({
					status: item.asvStatus,
					from: item.year,
					to: undefined,
					reduction: item.reduction,
				});
			}
		});
		
		return intervals;
	}

	loadData = () => {  
		if (!this.state.loading) {
			this.setState({
				loading: true,
			});

			getAuthorized(API.member + '/' + this.props.memberId + '/detail', 
				(response) => {
					this.setState({
						loading: false,
					});
					const body = response.body;

					let reductions = body.seasonReduction.sort((a, b) => a.year > b.year);
					let intervals = this.createIntervals(reductions);

					this.setState({
						firstName: body.firstName,
						lastName: body.lastName,
						email: body.email,
						intervals: intervals
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

	TitleComponent = Title("Daten");
	MemberDetailsWidgetComponent = withWidget(MemberDetails);

	render() {
		const { loading, modalOpen, unauthorizedSnackbarOpen, firstName, lastName, email, intervals } = this.state;
		const MemberDetailsWidget = this.MemberDetailsWidgetComponent;
		return (
			<MemberDetailsWidget 
				titleComponent={ this.TitleComponent } 
				loading={ loading }
				modalOpen={ modalOpen } 
				snackbarOpen={ unauthorizedSnackbarOpen }
				onSnackbarClose={this.handleSnackbarClose} 
				modalTitle={"Fehler bei der Kommunikation mit dem Server"}
				modalText={"Sollte das Problem anhalten melde dich bitte beim Takelmeister!"}
				onModalClose={this.handleModalClose} 
				firstName={firstName} 
				lastName={lastName} 
				email={email} 
				intervals={intervals} />	

		);
	}
}
