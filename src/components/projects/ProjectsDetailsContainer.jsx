import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withWidget, Title, getAuthorized } from '../HOC';
import ProjectsDetails from './ProjectsDetails.jsx';
import API from '../../constants.js'

export default class ProjectsDetailsContainer extends Component {
	static propTypes = {
		season: PropTypes.number.isRequired
	};

	constructor(props) {
		super(props);
		this.state={
			loading: false,
			numberProjects: 0,
			topProjects: []
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

			getAuthorized(API.projects + '/' + season + '/detail', 
				(response) => {
					this.setState({
						loading: false,
					});
					const body = response.body;

					this.setState({
						numberProjects: body.numberProjects,
						topProjects: body.projects
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
	ProjectsDetailsWidgetComponent = withWidget(ProjectsDetails);

	render() {
		const { loading, numberProjects, topProjects } = this.state;

		const ProjectsDetailsWidget = this.ProjectsDetailsWidgetComponent;
		return (
			<ProjectsDetailsWidget 
				loading={loading}
				titleComponent={ this.TitleComponent } 
				numberProjects={numberProjects}
				projects={topProjects}
				 />	

		);
	}
}
