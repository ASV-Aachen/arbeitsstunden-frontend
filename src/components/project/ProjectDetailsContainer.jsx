import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withWidget, Title, getAuthorized } from '../HOC';
import ProjectDetails from './ProjectDetails.jsx';
import API from '../../constants.js'

export default class ProjectDetailsContainer extends Component {
	static propTypes = {
		season: PropTypes.number.isRequired,
		projectId: PropTypes.string.isRequired,
	};

	constructor(props) {
		super(props);
		this.state={
			loading: false,
			description: '',
			percentage: 0.0,
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

			getAuthorized(API.project + '/' + this.props.projectId + '/' + season + '/details', 
				(response) => {
					this.setState({
						loading: false,
					});
					const body = response.body;

					this.setState({
						description: body.description,
						percentage: body.percentage,
						maxOverallMember: body.maxOverallMember,
						maxOverallMinutes: body.maxOverallMinutes,
						maxSeasonMember: body.maxSeasonMember,
						maxSeasonMinutes: body.maxSeasonMinutes,
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

	TitleComponent = Title("Details");
	ProjectDetailsWidgetComponent = withWidget(ProjectDetails);

	render() {
		const { season } = this.props;
		const { loading, description, percentage, maxOverallMember, maxOverallMinutes, maxSeasonMember, maxSeasonMinutes } = this.state;
		const ProjectDetailsWidget = this.ProjectDetailsWidgetComponent;

						

		return (
			<ProjectDetailsWidget
				titleComponent={ this.TitleComponent } 
				loading={loading}
				description={description}
				percentage={percentage}
				maxOverallMember={maxOverallMember}
				maxOverallMinutes={maxOverallMinutes}
				maxSeasonMember={maxSeasonMember}
				maxSeasonMinutes={maxSeasonMinutes}
				season={season}
				 />	

		);
	}
}
