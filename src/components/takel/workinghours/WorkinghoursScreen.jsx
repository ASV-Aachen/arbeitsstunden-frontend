import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

import CreateWorkinghourContainer from './CreateWorkinghourContainer.jsx';

export default class WorkinghoursScreen extends Component {
	static propTypes = {
	};

	render() {
		return (
			<Grid container spacing={24}>
				<Grid item xs={12}>
					<CreateWorkinghourContainer />
				</Grid>
			</Grid>
		);
	}
}
