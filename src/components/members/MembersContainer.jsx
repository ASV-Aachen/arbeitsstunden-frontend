import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withWidget, Title, getAuthorized } from '../HOC';
import Members from './Members.jsx';
import API from '../../constants.js'

export default class MembersContainer extends Component {
	static propTypes = {
		season: PropTypes.number.isRequired,
	};

	constructor(props) {
		super(props);
		this.state={
			loading: false,
			members: [],
		}
	}

	componentDidMount(){
		this.loadData(this.props.season);
	}

	componentWillReceiveProps(props) {
		if (this.props.season !== -1) {
			this.loadData(props.season);
		}
	}

	loadData = (season) => {  
		if (!this.state.loading) {
			this.setState({
				loading: true,
			});

			getAuthorized(API.members + '/' + season, 
				(response) => {
					this.setState({
						loading: false,
					});
					const body = response.body;

					this.setState({
						members: body
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

	TitleComponent = Title("Mitglieder mit Arbeitsstunden");
	MembersWidgetComponent = withWidget(Members);

	render() {
		const { loading, members } = this.state;
		const MembersWidget = this.MembersWidgetComponent;

		return (
			<MembersWidget
				titleComponent={ this.TitleComponent } 
				loading={loading}
				members={members}
				 />	

		);
	}
}
