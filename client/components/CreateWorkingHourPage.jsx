import React from 'react';
import Request from 'superagent';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';


import ProjectPicker from './ProjectPicker.jsx';
import SeasonPicker from './SeasonPicker.jsx';
import UserPicker from './UserPicker.jsx';

import { Config } from '../../config.js';

export default class CreateWorkingHourPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			users: [],
			seasons: [],
			selectedSeason: 0,
			currentSeason: 0,
		};
	};

	componentWillMount() {
		this.loadUsers();
		this.loadSeasons();
	};

	loadUsers = () => {
		const endpoint = Config.baseurl + Config.endpoints.users;
		Request.get(endpoint)
			.set('Content-Type', 'application/json')
			.then(success => {
				const users = success.body;
				this.setState({
					users: users,
				});
			}, failure => {
				console.error("Error: getting projects (Response: ", failure.status, ")", failure);
			});
	}

	loadSeasons = () => {
		const endpoint = Config.baseurl + Config.endpoints.seasons;
		Request.get(endpoint)
			.set('Content-Type', 'application/json')
			.then(success => {
				const { current, seasons } = success.body; 
				this.setState({
					seasons: seasons,
					selectedSeason: current,
					currentSeason: current
				});
			}, failure => {
				console.error("Error: getting seasons (Response: ", failure.status, ")", failure);
			});
	}

	handleSeasonChanged = (newSelectedSeason) => {
		this.setState({
			selectedSeason: newSelectedSeason
		});
	}

	handleSelectProject = (selectedProject) => {
		console.log("selectedProject" + selectedProject);
	}

	render() {
		const { currentSeason, selectedSeason, seasons, users } = this.state;

		return (
			<Paper>
				<AppBar position='static'>
					<Toolbar>
						<Typography type='title' color='inherit' style={{flex:'1'}}>
							<span>Arbeitstundeneintrag anlegen</span> 
						</Typography>
					</Toolbar>	    	
				</AppBar>

				<Paper>
					Step 1: Arbeitsstunden Saison auswählen + Projekt auswählen
					<SeasonPicker seasons={seasons} selected={selectedSeason} current={currentSeason} onChange={this.handleSeasonChanged}/>
					<ProjectPicker projects={[]} selected='none' onChange={this.handleSelectProject}/>
					NEXT
				</Paper>

				<Paper>
					Step 2: Titel
					<Grid container>
						<Grid item xs={12} sm={12}>
							{this.renderTextField({name:'title', text:'Titel', required:true})}
						</Grid>
						<Grid item xs={12} sm={12}>
							{this.renderTextField({name:'description', text:'Beschreibung', required:false})}
						</Grid>
					</Grid>
					NEXT
				</Paper>
				<Paper>
					Step 3: Mitglieder und Stunden hinzufugen 
					<UserPicker users={users} />
					NEXT
				</Paper>
				<Paper>

					Gesammte Stunden hinzugefuegt, falls nicht: zurueck gehen und aendern

					Kontrolle und Speichern
				</Paper>
			</Paper>
		);
	};

	renderTextField = ({ name, text, required }) => {
		return (
			<FormControl required={required} style={{width: '100%'}}>
				<InputLabel htmlFor={name}>{text}</InputLabel>
				<Input id={name} />
			</FormControl>
		);
	};

}
