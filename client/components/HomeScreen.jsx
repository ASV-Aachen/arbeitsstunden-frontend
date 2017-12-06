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

export default class HomeScreen extends React.Component {


	render() {
		return (
			<Grid container>
				<Grid item xs={12}>
					<Header />
				</Grid>
				<Grid container style={{margin:12, marginTop:0}}>
					<Grid item xs={12} sm={12}>
						<AuthRoute exact path="/" component={ MemberScreen } />
						<AuthRoute exact path="/members" component={ MembersScreen } />
						<AuthRoute exact path="/projects" component={ ProjectsScreen } />
						<AuthRoute exact path="/project/:projectName/:season/:projectId" component={ ProjectDetailsScreen } />
					</Grid>
				</Grid>
			</Grid>
		);
	}
}
