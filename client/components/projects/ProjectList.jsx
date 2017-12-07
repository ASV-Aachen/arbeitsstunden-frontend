import React from 'react';
import request from 'superagent';

import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Menu, { MenuItem } from 'material-ui/Menu';
import AppBar from 'material-ui/AppBar';
import Snackbar from 'material-ui/Snackbar';

export default class ProjectsScreen extends React.Component {

	render() {
		const { snackbarCreateOpen, createDialogOpen, anchorEl, open, snackbarOpen, currentProjects, selectedYear, availableSeasons, seasonLabels } = this.state;
		return (
			<Paper style={{position:'relative'}}>
			<CreateProjectDialog
			open={createDialogOpen}
			currentSeason={selectedYear}
			availableSeasons={availableSeasons}
			onRequestClose={this.handleRequestCreateDialogClose}
			onRequestCloseCreated={this.handleRequestProjectCreated}
			/>
			<AppBar position='static'>
			<Toolbar>
			<Typography type="title" color="inherit" style={{flex:'1'}}>

			{availableSeasons.length > 0 &&

				<span>Projekte für Saison {seasonLabels[selectedYear]}</span>
			}
			</Typography>

			<Button raised
			aria-owns={this.state.open ? 'simple-menu' : null}
			aria-haspopup="true"
			onClick={this.handleClick}
			>
			Saison wählen
			</Button>
			<Menu
			id="simple-menu"
			anchorEl={this.state.anchorEl}
			open={this.state.open}
			onRequestClose={this.handleRequestClose}
			>
			{availableSeasons.map((availableYear, index) => {
				return (
					<MenuItem
					key={availableYear.year}
					selected={availableYear.year==selectedYear}
					onClick={event => this.handleMenuItemClick(event, availableYear.year)}
					>
					{availableYear.label}
					</MenuItem>
				);
			}, this)}
			</Menu>
			</Toolbar>
			</AppBar>
			<Button fab color="accent" aria-label="add" style={{position:'absolute',right:0}} onClick={this.handleClickAdd}>
			<AddIcon />
			</Button>
			Von Menu auf Select umsteigen!

			{currentProjects != null &&
				<ProjectTable projects={currentProjects} season={selectedYear} />
			}

			<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
			open={this.state.snackbarOpen}
			SnackbarContentProps={{
				'aria-describedby': 'message-id',
			}}
			message={<span id="message-id">Fehler beim laden der Projekte. Versuche es später nochmal.</span>}
			onRequestClose={this.handleSnackbarClose}
			/>

			<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
			open={snackbarCreateOpen}
			SnackbarContentProps={{
				'aria-describedby': 'message-id',
			}}
			message={<span id="message-id">Projekt wurde erfolgreich angelegt</span>}
			onRequestClose={this.handleSnackbarClose}
			/>

			</Paper>
		);
	}
}
