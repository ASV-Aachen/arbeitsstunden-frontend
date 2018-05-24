import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withWidget, Title, getAuthorized } from '../HOC';
import Projects from './Projects.jsx';
import API from '../../constants.js'

export default class ProjectsContainer extends Component {
	static propTypes = {
		season: PropTypes.number.isRequired
	};

	constructor(props) {
		super(props);
		this.state={
			loading: false,
			projects: []
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

			getAuthorized(API.projects + '/' + season, 
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

	TitleComponent = Title("Projekte");
	ProjectsWidgetComponent = withWidget(Projects);

	render() {
		const { loading, projects } = this.state;
		const { season } = this.props;
		const ProjectsWidget = this.ProjectsWidgetComponent;

		return (
			<ProjectsWidget 
				titleComponent={ this.TitleComponent } 
				loading={loading}
				season={season}
				projects={projects}
				 />	

		);
	}
}
