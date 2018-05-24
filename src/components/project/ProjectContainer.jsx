import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withWidget, Title, getAuthorized } from '../HOC';
import Project from './Project.jsx';
import API from '../../constants.js'

export default class ProjectContainer extends Component {
	static propTypes = {
		season: PropTypes.number.isRequired,
		projectId: PropTypes.string.isRequired,
	};

	constructor(props) {
		super(props);
		this.state={
			loading: false,
			items: [],
			overallDuration: 0
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

			getAuthorized(API.project + '/' + this.props.projectId + '/' + season, 
				(response) => {
					this.setState({
						loading: false,
					});
					const body = response.body;


					const overallDuration = body.reduce( function (cnt, o) {return cnt + o.duration},0); 
					this.setState({
						items: body,
						overallDuration: overallDuration,
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

	ProjectWidgetComponent = withWidget(Project);

	render() {
		const { loading, items, overallDuration } = this.state;
		const ProjectWidget = this.ProjectWidgetComponent;

		return (
			<ProjectWidget
				titleComponent={ Title("Details (Gesamt: " + Math.ceil(overallDuration/30)/2 + " Stunden)") } 
				loading={loading}
				items={items}
				 />	

		);
	}
}
