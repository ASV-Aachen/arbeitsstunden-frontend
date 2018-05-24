import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import MembersDetailsContainer from './MembersDetailsContainer.jsx';
import MembersContainer from './MembersContainer.jsx';
import MembersDistributionGraphContainer from './MembersDistributionGraphContainer.jsx';

import { getAuthorized } from '../HOC';
import API from '../../constants.js'

export default class MembersScreen extends Component {
	static propTypes = {
		onSeasonsLoaded: PropTypes.func.isRequired,
		season: PropTypes.number.isRequired,
	};

	componentDidMount(){
		this.loadData();
	}

	loadData = () => {  
		getAuthorized(API.members + '/seasons', 
			(response) => {
				this.props.onSeasonsLoaded(response.body);
			}, 
			(response) => {
				console.error("Server replied: " + response);
			}
		);
	}

	render() {

		const { season } = this.props;

		return (
			<Grid container spacing={24}>
				<Grid item xs={12} sm={6}>
					<MembersDetailsContainer season={season} />
				</Grid>
				<Grid item xs={12} sm={6}>
					<MembersDistributionGraphContainer season={season} />
				</Grid>
				<Grid item xs={12}>
					<MembersContainer season={season} />
				</Grid>
			</Grid>
		);
	}
}
