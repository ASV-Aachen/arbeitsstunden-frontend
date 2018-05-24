import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

import CreateSeasonContainer from './CreateSeasonContainer.jsx';

export default class SeasonsScreen extends Component {
	static propTypes = {
	};

	render() {
		return (
			<Grid container spacing={24}>
				<Grid item xs={12}>
					<CreateSeasonContainer />
				</Grid>
			</Grid>
		);
	}
}
