import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import ProjectDetailsContainer from './ProjectDetailsContainer.jsx';
import ProjectContainer from './ProjectContainer.jsx';
import ProjectDistributionGraphContainer from './ProjectDistributionGraphContainer.jsx';

export default class ProjectScreen extends Component {

	render() {
		const { projectId, season } = this.props.match.params;

		return (
			<Grid container spacing={24}>
				<Grid item xs={12} sm={6}>
					<ProjectDetailsContainer projectId={projectId} season={parseInt(season, 10)} />
				</Grid>
				<Grid item xs={12} sm={6}>
					<ProjectDistributionGraphContainer projectId={projectId} />
				</Grid>
				<Grid item xs={12}>
					<ProjectContainer projectId={projectId}  season={parseInt(season, 10)} />
				</Grid>
			</Grid>
		);
	}
}
