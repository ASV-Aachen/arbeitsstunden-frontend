import React from 'react';
import request from 'superagent';

import AppBar from 'material-ui/AppBar';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Snackbar from 'material-ui/Snackbar';

import UserTable from './UserTable.jsx'
import CreateUserPage from './CreateUserPage.jsx'

export default class UserListPage extends React.Component {

	state = {
		open: false,
		currentUsers: [],
	};

	componentWillMount() {
		this.loadUsers();
	};

	handleClickAdd = () => {
		this.setState({
			open: true,
		});
	};

	handleRequestCloseCanceled = () => {
		this.setState({
			open:false,
		});
	};

	handleRequestCloseCreated = (createdUser) => {
		this.loadUsers();
		this.setState({
			open:false,
			snackbarCreateOpen: true
		});
	}

	handleSnackbarClose = () => {
		this.setState({
			snackbarCreateOpen: false
		});
	}

	loadUsers = () => {
        const endpoint = 'http://localhost:8081/api/users/';

        request.get(endpoint)
            .set('Content-Type', 'application/json')
            .then(success => {

				const users = success.body;
					this.setState({
						currentUsers: users,
					});
            }, failure => {
                console.error("Error: getting projects (Response: ", failure.status, ")", failure);
				this.setState({ snackbarOpen: true});
            });
     }

	render() {
		const { currentUsers, open, snackbarCreateOpen } = this.state;

		return (
			<Paper style={{position:'relative'}}>
				<CreateUserPage open={open} onRequestCloseCanceled={this.handleRequestCloseCanceled} onRequestCloseCreated={this.handleRequestCloseCreated}/>
				<AppBar position='static'>
					<Toolbar>
						<Typography type="title" color="inherit" style={{flex:'1'}}>
							<span>Mitglieder Liste</span>
						</Typography>
					</Toolbar>
				</AppBar>
				<Button fab color="accent" aria-label="add" style={{position:'absolute',right:0}} onClick={()=>{this.setState({createUserDialogOpen:true})}}>
					<AddIcon />
			  </Button>
				Oder nur icon mit segelstatus/ oder ASV status
				---
				pro arbeitstunden Saison bekommt man einen Status (Aktiv/Anwarter,Inaktiv, Gast)
				<UserTable users={currentUsers} />

				<Snackbar
				 anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
				 open={snackbarCreateOpen}
				 SnackbarContentProps={{
				 'aria-describedby': 'message-id',
				 }}
				 message={<span id="message-id">Benutzer wurde erfolgreich angelegt</span>}
				 onRequestClose={this.handleSnackbarClose}
			 />

			</Paper>
		);
	}
}
