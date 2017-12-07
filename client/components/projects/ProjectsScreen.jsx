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

		this.state = {
			anchorEl: null,
			open: false,
			snackbarOpen: false,
			createDialogOpen: false,
			currentProjects: null,
			selectedYear: 0,
			availableSeasons: [],
			seasonLabels: null
		};
	};

	componentWillMount() {
        this.loadInitialProjects();
    };

	loadInitialProjects = () => {
		const endpoint = Config.baseurl + Config.endpoints.activeProjects;

        request.get(endpoint)
            .set('Content-Type', 'application/json')
            .then(success => {

				const body = success.body;

				const seasonLabels = body.seasons.reduce(function(map, obj) {
					map[obj.year] = obj.label;
					return map;
				}, {});

				this.setState({
					currentProjects: body.projects,
					selectedYear: body.activeYear,
					availableSeasons: body.seasons.sort(function (a,b) {return b.year - a.year}),
					seasonLabels: seasonLabels
				});
            }, failure => {
                console.error("Error: getting current projects (Response: ", failure.status, ")", failure);
				this.setState({ snackbarOpen: true});
            });
     }

	loadProjects = (year) => {
		const endpoint = Config.baseurl + Config.endpoints.projects + year;
        request.get(endpoint)
            .set('Content-Type', 'application/json')
            .then(success => {

				const projects = success.body;

				this.setState({
					currentProjects: projects,
				});
            }, failure => {
                console.error("Error: getting projects (Response: ", failure.status, ")", failure);
				this.setState({ snackbarOpen: true});
            });
     }

	handleClick = event => {
		this.setState({ open: true, anchorEl: event.currentTarget });
	};

	handleClickAdd = event => {
		this.setState({ createDialogOpen: true});
	};


	handleRequestClose = (event) => {
		this.setState({ open: false });
	};

	handleSnackbarClose = (event) => {
		this.setState({ snackbarOpen: false, snackbarCreateOpen:false });
	};

	handleMenuItemClick = (event, selectedYear) => {
		this.setState({
			selectedYear: selectedYear,
			currentProjects: null,
			open: false,
		});

		this.loadProjects(selectedYear);
  	};

	handleRequestCreateDialogClose = () => {
		this.setState({ createDialogOpen: false});
	};

	handleRequestProjectCreated = () => {
		this.setState({
			createDialogOpen:false,
			snackbarCreateOpen: true
		});
	};

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
