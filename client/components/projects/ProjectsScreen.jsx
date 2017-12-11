import React from 'react';
import PropTypes from 'prop-types';
import request from 'superagent';

import Grid from 'material-ui/Grid';

import { Config } from '../../../config.js'

import ProjectsSummary from './ProjectsSummary.jsx'
import ProjectsDistributionGraph from './ProjectsDistributionGraph.jsx'
import ProjectsDetails from './ProjectsDetails.jsx'

export default class ProjectsScreen extends React.Component {
	static propTypes = {
		onAvailableSeasonsLoaded: PropTypes.func.isRequired,
		season: PropTypes.number.isRequired,
	};

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
				this.props.onAvailableSeasonsLoaded(body);
            }, failure => {
                console.error("Error: getting available seasons (Response: ", failure.status, ")", failure);
            });
     }

	render() {
		const { season } = this.props;
		return (
			<Grid container spacing={24}>
			{ false && 
				<Grid item xs={12} sm={6}>
					<ProjectsSummary />
				</Grid> 
			}
			{ false && 
				<Grid item xs={12} sm={6}>
					<ProjectsDistributionGraph />
				</Grid>
			}
				<Grid item xs={12}>
					<ProjectsDetails season={season}/>
				</Grid>
			</Grid>
		);
	}
}
