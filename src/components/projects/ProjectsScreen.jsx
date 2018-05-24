import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import ProjectsDetailsContainer from './ProjectsDetailsContainer.jsx';
import ProjectsContainer from './ProjectsContainer.jsx';
import ProjectsDistributionGraphContainer from './ProjectsDistributionGraphContainer.jsx';

import { getAuthorized } from '../HOC';
import API from '../../constants.js'

export default class ProjectsScreen extends Component {
	static propTypes = {
		onSeasonsLoaded: PropTypes.func.isRequired,
		season: PropTypes.number.isRequired,
	};

	componentDidMount(){
		this.loadData();
	}

	loadData = () => {  
		getAuthorized(API.projects + '/seasons', 
			(response) => {
				this.props.onSeasonsLoaded(response.body);
			}, 
			(response) => {
				console.error("Server replied: " + response);
			}
		);
	}

	render() {
		const { season } = this.props;
		return (
			<Grid container spacing={24}>
				<Grid item xs={12} sm={6}>
					<ProjectsDetailsContainer season={season} />
				</Grid>
				<Grid item xs={12} sm={6}>
					<ProjectsDistributionGraphContainer season={season} />
				</Grid>
				<Grid item xs={12}>
					<ProjectsContainer season={season} />
				</Grid>
			</Grid>
		);
	}
}
