import React from 'react';
import request from 'superagent';

import Paper from 'material-ui/Paper';

import { Config } from '../../config.js';

export default class ProjectPage extends React.Component {
	constructor(props) {
		super(props);
	};

	componentWillMount() {
		this.loadProjectDetails();
    };

	loadProjectDetails = () => {
		const { projectId, season } = this.props.match.params;
		const endpoint = Config.baseurl + Config.endpoints.projectDetails + "/" + season + "/" + projectId;

        request.get(endpoint)
            .set('Content-Type', 'application/json')
            .then(success => {
				const body = success.body;

				console.log(body);

				this.setState({
				});
            }, failure => {
                console.error("Error: getting project details (Response: ", failure.status, ")", failure);
            });
     }

	render() {
		const { projectId, season } = this.props.match.params;

		return (
			<Paper style={{position:'relative'}}>
				{projectId} <br />
				{season}
			</Paper>
		);
	}
}
