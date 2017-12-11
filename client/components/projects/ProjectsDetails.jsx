import React from 'react';
import request from 'superagent';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';

import { Config } from '../../../config.js';
import ProjectsTable from './ProjectsTable.jsx'

export default class ProjectsDetails extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			loading: true,
			projects: [],
		}
	};

	componentWillMount() {
		if (this.props.season != -1) {
			this.setState({loading: true});
			this.loadProjects(this.props.season);
		}
    };

	componentWillReceiveProps(nextProps) {
		if (this.props.season != nextProps.season) {
			this.setState({loading: true});
			this.loadProjects(nextProps.season);
		}
	}

	loadProjects = (season) => {
		const endpoint = Config.baseurl + Config.endpoints.projects + season;
        request.get(endpoint)
            .set('Content-Type', 'application/json')
            .then(success => {
				const projects = success.body;
				this.setState({
					projects: projects,
					loading: false,
				});
            }, failure => {
                console.error("Error: getting projects (Response: ", failure.status, ")", failure);
				this.setState({ snackbarOpen: true});
            });
     }
	

	render() {
		const { season } = this.props;
		const { loading, projects } = this.state;
		return (
			<Paper>
				<AppBar position='static'>
					<Toolbar>
						<Typography type="title" color="inherit" style={{flex:'1'}}>
							<span>Projekte</span>
						</Typography>
					</Toolbar>
					{loading && <LinearProgress /> }
				</AppBar>
				<ProjectsTable projects={projects} season={season} />
			</Paper>
		);
	}
}
