import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom'

import AuthRoute from './AuthRoute.jsx'

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

import Header from './Header.jsx';
import MemberScreen from './member/MemberScreen.jsx';
import MembersScreen from './members/MembersScreen.jsx';
import ProjectsScreen from './projects/ProjectsScreen.jsx';
import ProjectDetailsScreen from './project/ProjectDetailsScreen.jsx';
import TakelScreen from './takel/TakelScreen.jsx';

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			availableSeasons: {
				seasons: [],
				activeSeason: -1,
			},
			selectedSeason: -1,
		};
	};

	availableSeasonsLoaded = (availableSeasons) => {
		this.setState({
			availableSeasons: availableSeasons,
		});
	} 

	seasonSelected = (season) => {
		this.setState({
			selectedSeason: season,
		});
	}

	render() {
		const { selectedSeason, availableSeasons } = this.state;
		return (
			<Grid container>
				<Grid item xs={12}>
					<Header availableSeasons={availableSeasons} onSelectedSeason={this.seasonSelected}/>
				</Grid>
				<Grid container style={{margin:12, marginTop:0}}>
					<Grid item xs={12} sm={12}>
						<AuthRoute exact path="/" component={ MemberScreen } />
						<AuthRoute exact path="/members" component={ MembersScreen } />
						<AuthRoute exact path="/projects/:season?" render={(props)=> <ProjectsScreen onAvailableSeasonsLoaded={this.availableSeasonsLoaded} season={selectedSeason} /> } />
						<AuthRoute exact path="/project/:projectName/:season/:projectId" component={ ProjectDetailsScreen } />
						<AuthRoute exact path="/takel" component={ TakelScreen } />
					</Grid>
				</Grid>
			</Grid>
		);
	}
}
