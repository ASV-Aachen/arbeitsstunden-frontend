import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withWidget, getAuthorized, Title } from '../HOC' 
import MemberHoursGraph from './MemberHoursGraph.jsx';
import API from '../../constants.js'

export default class MemberHoursGraphContainer extends Component {
	
	static propTypes = {
		memberId: PropTypes.string.isRequired
	};

	constructor(props) {
		super(props);
		this.state={
			loading: false,
			modalOpen: false,
			unauthorizedSnackbarOpen: false,
			hours: [],
			obligatoryHours: [],
			labels: []
		}
	}

	componentDidMount(){
		this.loadData();
	}

	loadData = () => {  
		if (!this.state.loading) {
			this.setState({
				loading: true,
			});

			getAuthorized(API.member + '/' + this.props.memberId + '/overview', 
				(response) => {
					this.setState({
						loading: false,
					});

					const body = response.body;

					let hours = [];
					let obligatoryHours = [];
					let labels = []

					body.forEach(function(item) {
						hours.push(item.minutes/60);
						labels.push(item.season.label);
						obligatoryHours.push(item.season.obligatoryMinutes/60);
					});

					this.setState({
						hours: hours,
						labels: labels,
						obligatoryHours: obligatoryHours,
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

	TitleComponent = Title("Arbeitsstunden Übersicht");
	MemberHoursGraphWidgetComponent = withWidget(MemberHoursGraph);

	render() {
		const { loading, modalOpen, unauthorizedSnackbarOpen, hours, labels, obligatoryHours } = this.state;
		const MemberHoursGraphWidget = this.MemberHoursGraphWidgetComponent;

		return (
			<MemberHoursGraphWidget 
				titleComponent={this.TitleComponent}
				loading={loading}
				modalOpen={ modalOpen } 
				snackbarOpen={ unauthorizedSnackbarOpen }
				onSnackbarClose={this.handleSnackbarClose} 
				modalTitle={"Fehler bei der Kommunikation mit dem Server"}
				modalText={"Sollte das Problem anhalten melde dich bitte beim Takelmeister!"}
				onModalClose={this.handleModalClose} 
				hours={hours} 
				labels={labels} 
				obligatoryHours={obligatoryHours} />
		);
	}
}
