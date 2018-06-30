import React, { Component } from 'react';

import { withWidget, getAuthorized, Title } from '../../HOC'; 
import API from '../../../constants.js';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

import MemberList from './MemberList.jsx';
import TakelList from './TakelList.jsx';
import CreateUserDialogContainer from '../CreateUserDialogContainer.jsx';

export default class MemberListContainer extends Component {
	static propTypes = {
	};

	constructor(props) {
		super(props);
		this.state={
			loading: false,
			loadingTakel: false,
			modalOpen: false,
			unauthorizedSnackbarOpen: false,
			members: [],
			takelMembers: [],
			createUserDialogOpen: false,
		};
	}

	componentDidMount(){
		this.loadMembersData();
		this.loadTakelMembersData();
	}

	loadMembersData = () => {  
		if (!this.state.loading) {
			this.setState({
				loading: true,
			});

			getAuthorized(API.members, 
				(response) => {
					this.setState({
						loading: false,
					});
					const body = response.body;

					this.setState({
						members: body,
					});
				}, 
				(response) => {
					this.setState({
						loading: false,
					});
					if (response.status === 401) {
						this.setState({
							unauthorizedSnackbarOpen: true,
						});	
					} else {
						this.setState({
							modalOpen: true,
						});
						console.error("Server replied: " + response);
					}
				}
			);
		}
	}

	loadTakelMembersData = () => {  
		if (!this.state.loadingTakel) {
			this.setState({
				loadingTakel: true,
			});

			getAuthorized(API.members + "/takel", 
				(response) => {
					this.setState({
						loadingTakel: false,
					});
					const body = response.body;

					this.setState({
						takelMembers: body,
					});
				}, 
				(response) => {
					this.setState({
						loadingTakel: false,
					});
					if (response.status === 401) {
						this.setState({
							unauthorizedSnackbarOpen: true,
						});	
					} else {
						this.setState({
							modalOpen: true,
						});
						console.error("Server replied: " + response);
					}
				}
			);
		}
	}

	handleSnackbarClose = () => {
		this.setState({
			unauthorizedSnackbarOpen: false,
		});
	}

	handleModalClose = () => {
		this.setState({
			modalOpen: false,
		});
	}

	handleUserCreated = () => {
		this.setState({
			createUserDialogOpen: false,
		});
		this.loadMembersData();
	}

	handleUserCanceled = () => {
		this.setState({
			createUserDialogOpen: false,
		});
	}

	MembersWidgetContainerComponent = withWidget(MemberList);
	MembersTitleComponent = Title("Mitglieder");

	TakelListWidgetContainerComponent = withWidget(TakelList);
	TakelListTitleComponent = Title("Mitglieder mit Takelmeister Recht");

	render() {
		const { loading, loadingTakel, modalOpen, unauthorizedSnackbarOpen, members, createUserDialogOpen, takelMembers } = this.state;

		const MemberListWidget = this.MembersWidgetContainerComponent;
		const TakelListWidget = this.TakelListWidgetContainerComponent;

		return (
			<span>
				<Button variant="fab" color="primary" aria-label="add" style={{position:'absolute', top: 225, right:35, zIndex:1000}} onClick={()=>{this.setState({createUserDialogOpen: true,})}}>
					<AddIcon />
				</Button>
				<CreateUserDialogContainer open={createUserDialogOpen} userCreated={this.handleUserCreated} userCanceled={this.handleUserCanceled} /> 
				<MemberListWidget 
					titleComponent={this.MembersTitleComponent}
					loading={loading}
					modalOpen={ modalOpen } 
					snackbarOpen={ unauthorizedSnackbarOpen }
					onSnackbarClose={this.handleSnackbarClose} 
					modalTitle={"Fehler bei der Kommunikation mit dem Server"}
					modalText={"Sollte das Problem anhalten melde dich bitte beim Takelmeister!"}
					onModalClose={this.handleModalClose} 
					members={members}
				/>
				<div style={{"height":24}}></div>
				<TakelListWidget 
					titleComponent={this.TakelListTitleComponent}
					loading={loadingTakel}
					modalOpen={ modalOpen } 
					snackbarOpen={ unauthorizedSnackbarOpen }
					onSnackbarClose={this.handleSnackbarClose} 
					modalTitle={"Fehler bei der Kommunikation mit dem Server"}
					modalText={"Sollte das Problem anhalten melde dich bitte beim Takelmeister!"}
					onModalClose={this.handleModalClose} 
					members={takelMembers}
				/>
			</span>
		);
	}
}
