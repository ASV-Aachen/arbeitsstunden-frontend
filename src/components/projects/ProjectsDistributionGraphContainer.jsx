import React, { Component } from 'react';

import { withWidget, Title, getAuthorized } from '../HOC';
import ProjectsDistributionGraph from './ProjectsDistributionGraph.jsx';
import API from '../../constants.js'

export default class ProjectsDistributionGraphContainer extends Component {
	static propTypes = {
	};

	constructor(props) {
		super(props);
		this.state={
			loading: false,
			seasons: []
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

			getAuthorized(API.projects + '/overview', 
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

	TitleComponent = Title("Historie");
	ProjectsDistributionGraphWidgetComponent = withWidget(ProjectsDistributionGraph);

	render() {
		const { seasons} = this.state;
		const ProjectsDistributionGraphWidget = this.ProjectsDistributionGraphWidgetComponent;
		return (
			<ProjectsDistributionGraphWidget 
				titleComponent={ this.TitleComponent } 
				seasons={ seasons}
				 />	

		);
	}
}
