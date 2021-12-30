import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import AuthRoute from './AuthRoute.jsx'
import HeaderContainer from './HeaderContainer.jsx'
import MemberScreen from './member/MemberScreen.jsx'
import MembersScreen from './members/MembersScreen.jsx'
import ProjectScreen from './project/ProjectScreen.jsx'
import ProjectsScreen from './projects/ProjectsScreen.jsx'
import TakelScreen from './takel/TakelScreen.jsx'

export default class MainScreen extends Component {

	constructor(props) {
		super(props);

		this.state = {
			seasons: {seasons: [], currentSeason: -1},
			selectedSeason: -1
		};
	};

	onSeasonsLoaded = (path) => (seasons) => {
		if (this.state.selectedSeason === -1) {
			this.setState({
				seasons: seasons,
				selectedSeason: seasons.currentSeason
			});
			this.props.history.push('/' + path + '/' + seasons.currentSeason);
		} else {
			this.props.history.push('/' + path + '/' + this.state.selectedSeason);
			this.setState({
				seasons: seasons
			});
		}
	}

	onSeasonChanged = (path) => (season) => {
		this.setState({selectedSeason: season});
		this.props.history.push('/' + path + '/' + season);
	}

	render() {
		const { seasons, selectedSeason } = this.state;

		return (
			<Grid container>
				<Grid item xs={12}>
					<HeaderContainer seasons={seasons} selectedSeason={selectedSeason} seasonChanged={this.onSeasonChanged} />
				</Grid>
				<Grid container style={{margin:17, marginTop:20}}>
					<AuthRoute exact path="/arbeitsstunden/member/:memberId?" component={ MemberScreen } />
					<AuthRoute exact path="/arbeitsstunden/members/:season?" render={
						(props) => {
							return(<MembersScreen onSeasonsLoaded={this.onSeasonsLoaded('members')} season={selectedSeason} />);
						}} />
					<AuthRoute exact path="/arbeitsstunden/project/:projectName/:season/:projectId" component={ ProjectScreen } />
					<AuthRoute exact path="/arbeitsstunden/projects/:season?" render={
						(props) => {
							return(<ProjectsScreen onSeasonsLoaded={this.onSeasonsLoaded('projects')} season={selectedSeason}  {...props} />);
						}} />

					<AuthRoute path="/takel" component={ TakelScreen } />
				</Grid>
			</Grid>
		);
	}
}
