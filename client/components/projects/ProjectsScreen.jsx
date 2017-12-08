import React from 'react';
import request from 'superagent';

import Grid from 'material-ui/Grid';

import { Config } from '../../../config.js'

import ProjectsSummary from './ProjectsSummary.jsx'
import ProjectsDistributionGraph from './ProjectsDistributionGraph.jsx'
import ProjectsDetails from './ProjectsDetails.jsx'

export default class ProjectsScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
        this.loadAvailableSeasons();
    };

	loadAvailableSeasons = () => {
		const endpoint = Config.baseurl + Config.endpoints.seasons;
        request.get(endpoint)
            .set('Content-Type', 'application/json')
            .then(success => {
				const body = success.body;
				console.log(body);
            }, failure => {
                console.error("Error: getting current projects (Response: ", failure.status, ")", failure);
            });
     }

	render() {
		return (
			<Grid container spacing={24}>
				<Grid item xs={12} sm={6}>
					<ProjectsSummary />
				</Grid>
				<Grid item xs={12} sm={6}>
					<ProjectsDistributionGraph />
				</Grid>
				<Grid item xs={12}>
					<ProjectsDetails />
				</Grid>
			</Grid>
		);
	}
}
