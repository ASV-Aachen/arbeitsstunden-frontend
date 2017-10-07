import React from 'react';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';


import ProjectPicker from './ProjectPicker.jsx'
import SeasonPicker from './SeasonPicker.jsx'
import UserPicker from './UserPicker.jsx'

export default class CreateWorkingHourPage extends React.Component {

	handleSelectSeason = (selectedSeason) => {
		console.log("selectedSeason" + selectedSeason);
	};

	handleSelectProject = (selectedProject) => {
		console.log("selectedProject" + selectedProject);
	};

	render() {

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
					<SeasonPicker seasons={[]} selected='none' onChange={this.handleSelectSeason}/>
					<ProjectPicker projects={[]} selected='none' onChange={this.handleSelectProject}/>
					NEXT
				</Paper>

				<Paper>
					Step 2: Titel, Beschreibung
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
					<UserPicker users={[{id: "b2388d82-0b47-49b8-bdf4-d088b31d43f5", firstName: "Ralf", lastName: "Bettermann", email: "ralf.bettermann@rwth-aachen.de"},{id: "fba80af3-26a6-409d-b209-90bb14b18603", firstName: "Max", lastName: "Mohr", email: "max@mohr.de"}]} />
					NEXT
				</Paper>
				<Paper>
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
