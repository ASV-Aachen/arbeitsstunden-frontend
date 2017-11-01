import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom'

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import CreateWorkingHourScreen from './CreateWorkingHourScreen.jsx';
import MemberScreen from './MemberScreen.jsx';

export default class HomeScreen extends React.Component {

	render() {
		return (
			<div>
				<Grid container>
					<Grid item xs={12}>
						<AppBar position='static'>
							<Toolbar>
								<Typography type='title' color='inherit' style={{flex:'1'}}>
									<span>Hallo Ralf</span>
								</Typography>
							</Toolbar>
						</AppBar>
					</Grid>
					
					<Grid container style={{margin:12, marginTop:0}}>
						<Grid item xs={12} sm={12}>
							<MemberScreen />
						</Grid>
					</Grid>

				</Grid>



				   <div style={{marginTop:200}}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper>xs=12</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper>xs=6 sm=3</Paper>
        </Grid> 
      </Grid> 
    </div>
			</div>
		);
	}
}
