import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withWidget, Title, getAuthorized } from '../HOC';
import MembersDetails from './MembersDetails.jsx';
import API from '../../constants.js'

export default class MembersDetailsContainer extends Component {
	static propTypes = {
		season: PropTypes.number.isRequired,
	};

	constructor(props) {
		super(props);
		this.state={
			loading: false,
			workedMinutes: -1,
			numMembersSailingAllowed: -1,
			numMembersSailingNotAllowed: -1,
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

			getAuthorized(API.members + '/' + season + '/details', 
				(response) => {
					this.setState({
						loading: false,
					});
					const body = response.body;

					this.setState({
						workedMinutes: body.workedMinutesTotal,
						numMembersSailingAllowed: body.numMembersSailingAllowed,
						numMembersSailingNotAllowed: body.numMembersSailingNotAllowed,
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

	TitleComponent = Title("Zusammenfassung");
	MemberDetailsWidgetComponent = withWidget(MembersDetails);

	render() {
		const { loading, workedMinutes, numMembersSailingAllowed, numMembersSailingNotAllowed } = this.state;
		const MembersDetailsWidget = this.MemberDetailsWidgetComponent;

		return (
			<MembersDetailsWidget
				titleComponent={ this.TitleComponent } 
				loading={loading}
				workedMinutes={workedMinutes}
				numMembersSailingAllowed={numMembersSailingAllowed}
				numMembersSailingNotAllowed={numMembersSailingNotAllowed}
				 />	

		);
	}
}
