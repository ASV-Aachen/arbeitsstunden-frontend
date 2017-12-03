import React from 'react';
import request from 'superagent';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';


import { Config } from '../../config.js';

export default class ProjectSummary extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			description: "",
		}
	};

	componentWillMount() {
		this.loadProjectSummary();
    };

	loadProjectSummary = () => {
		const { projectId, season } = this.props;
		const endpoint = Config.baseurl + Config.endpoints.projectSummary + "/" + season + "/" + projectId;

        request.get(endpoint)
            .set('Content-Type', 'application/json')
            .then(success => {
				const body = success.body;

				this.setState({
					description: body.description,
					percentage: body.percentage,
				});
            }, failure => {
                console.error("Error: getting project summary (Response: ", failure.status, ")", failure);
            });
     }

	render() {
		const { description, percentage } = this.state;
		const { projectId, season } = this.props;
		return (
			<Paper>
				<AppBar position='static'>
					<Toolbar>
						<Typography type="title" color="inherit" style={{flex:'1'}}>
							<span>Übersicht</span>
						</Typography>
					</Toolbar>
				</AppBar>
				<div style={{padding:15}}>
					{ description }<br /><br />
					Arbeitstundensaison <b>{ season-1 }/{ season }</b><br /><br />
					{ (percentage * 100).toFixed(2) }% von allen Projekten<br /><br />
				</div>
			</Paper>
		);
	}
}
