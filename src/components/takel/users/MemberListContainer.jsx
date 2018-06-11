import React, { Component } from 'react';

import { withWidget, getAuthorized, Title } from '../../HOC'; 
import API from '../../../constants.js';

import MemberList from './MemberList.jsx';

export default class MemberListContainer extends Component {
	static propTypes = {
	};

	constructor(props) {
		super(props);
		this.state={
			loading: false,
			modalOpen: false,
			unauthorizedSnackbarOpen: false,
			members: [],
		};
	}

	componentDidMount(){
		this.loadData();
	}

	loadData = () => {  
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

	MembersWidgetContainerComponent = withWidget(MemberList);
	TitleComponent = Title("Mitglieder");

	render() {
		const { loading, modalOpen, unauthorizedSnackbarOpen, members } = this.state;

		const MemberListWidget = this.MembersWidgetContainerComponent;

		return (
			<MemberListWidget 
				titleComponent={this.TitleComponent}
				loading={loading}
				modalOpen={ modalOpen } 
				snackbarOpen={ unauthorizedSnackbarOpen }
				onSnackbarClose={this.handleSnackbarClose} 
				modalTitle={"Fehler bei der Kommunikation mit dem Server"}
				modalText={"Sollte das Problem anhalten melde dich bitte beim Takelmeister!"}
				onModalClose={this.handleModalClose} 
				members={members}
			/>
		);
	}
}
