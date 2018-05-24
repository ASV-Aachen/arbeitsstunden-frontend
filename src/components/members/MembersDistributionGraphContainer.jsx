import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withWidget, Title, getAuthorized } from '../HOC';
import MembersDistributionGraph from './MembersDistributionGraph.jsx';
import API from '../../constants.js'

export default class MembersDistributionGraphContainer extends Component {
	static propTypes = {
		season: PropTypes.number.isRequired,
	};

	constructor(props) {
		super(props);
		this.state={
			loading: false,
			labels: [],
			hours: [],
		}
	}

	componentDidMount(){
		this.loadData(this.props.season);
	}

	componentWillReceiveProps(props) {
		if (this.props.season !== -1) {
			this.loadData(props.season);
		}
	}

	loadData = (season) => {  
		if (!this.state.loading) {
			this.setState({
				loading: true,
			});

			getAuthorized(API.members + '/' + season + '/distribution', 
				(response) => {
					this.setState({
						loading: false,
					});
					const body = response.body;

					let hours = [];
					let labels = []

					let map = {
						"PROSPECT":"Anwärter",
						"ACTIVE": "Aktiv",
						"INACTIVE": "Inaktiv",
						"QUIT": "Ausgetreten",
						"OLD_MAN": "Alter Herr",
					}

					body.forEach(function(item) {
						hours.push(item.minutes/60);
						labels.push(map[item.label]);
					});

					this.setState({
						hours: hours,
						labels: labels,
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

	TitleComponent = Title("Mitgliederverteilung");
	MembersDistributionGraphWidgetComponent = withWidget(MembersDistributionGraph);

	render() {
		const { loading, labels, hours } = this.state;
		const MembersDistributionGraphWidget = this.MembersDistributionGraphWidgetComponent;

		return (
			<MembersDistributionGraphWidget
				titleComponent={ this.TitleComponent } 
				loading={loading}
				labels={labels}
				hours={hours}
				 />	

		);
	}
}
