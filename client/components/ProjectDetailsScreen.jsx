import React from 'react';
import request from 'superagent';

import Grid from 'material-ui/Grid';

import { Config } from '../../config.js';

import ProjectSummary from './ProjectSummary.jsx'
import ProjectForYearsGraph from './ProjectForYearsGraph.jsx'
import ProjectDetails from './ProjectDetails.jsx'

export default class ProjectPage extends React.Component {
	constructor(props) {
		super(props);
	};

	render() {
		const { projectId, season } = this.props.match.params;

		return (
			<Grid container spacing={24}>
				<Grid item xs={12} sm={6}>
					<ProjectSummary />
				</Grid>
				<Grid item xs={12} sm={6}>
					<ProjectForYearsGraph projectId={projectId} selectedSeason={season}/>
				</Grid>
				<Grid item xs={12}>
					<ProjectDetails projectId={projectId} season={season} />
				</Grid>
			</Grid>
		);
	}
}
