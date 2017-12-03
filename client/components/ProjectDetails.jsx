import React from 'react';
import request from 'superagent';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import { Config } from '../../config.js';
import ProjectWorkingHourItemTable from './ProjectWorkingHourItemTable.jsx'


export default class ProjectDetails extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentItems: [],
		}

	};

	componentWillMount() {
		this.loadProjectDetails();
    };

	loadProjectDetails = () => {
		const { projectId, season } = this.props;
		const endpoint = Config.baseurl + Config.endpoints.projectDetails + "/" + season + "/" + projectId;

        request.get(endpoint)
            .set('Content-Type', 'application/json')
            .then(success => {
				const body = success.body;

				this.setState({
					currentItems: body,
				});
            }, failure => {
                console.error("Error: getting project details (Response: ", failure.status, ")", failure);
            });
     }

	render() {

		const { currentItems } = this.state;
		
		return (
			<Paper>
				<AppBar position='static'>
					<Toolbar>
						<Typography type="title" color="inherit" style={{flex:'1'}}>
							<span>Details</span>
						</Typography>
					</Toolbar>
				</AppBar>
				<ProjectWorkingHourItemTable items={currentItems} />
			</Paper>
		);
	}
}
