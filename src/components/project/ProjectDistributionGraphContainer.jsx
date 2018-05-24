import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withWidget, Title, getAuthorized } from '../HOC';
import ProjectDistributionGraph from './ProjectDistributionGraph.jsx';
import API from '../../constants.js'

export default class ProjectDistributionGraphContainer extends Component {
	static propTypes = {
		projectId: PropTypes.string.isRequired,
	};

	constructor(props) {
		super(props);
		this.state={
			loading: false,
			labels: [],
			values: []
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

			getAuthorized(API.project + '/' + this.props.projectId + '/distribution', 
				(response) => {
					this.setState({
						loading: false,
					});
					const body = response.body;

					let sortedItems = body.sort(function (a,b) {return a.season - b.season});
					this.setState({
						labels: sortedItems.map(item => item.season),
						values: sortedItems.map(item => Math.ceil(item.duration/30)/2),
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

	TitleComponent = Title("Verteilung");
	ProjectDistributionGraphWidgetComponent = withWidget(ProjectDistributionGraph);

	render() {
		const { loading, labels, values } = this.state;
		const ProjectDistributionGraphWidget = this.ProjectDistributionGraphWidgetComponent;

		return (
			<ProjectDistributionGraphWidget
				titleComponent={ this.TitleComponent } 
				loading={loading}
				labels={labels}
				values={values}
				 />	

		);
	}
}
