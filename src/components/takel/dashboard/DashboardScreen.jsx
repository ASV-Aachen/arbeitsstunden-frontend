import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

import WorkinghoursExportContainer from './WorkinghoursExportContainer.jsx';

export default class DashboardScreen extends Component {
	static propTypes = {
	};

	render() {
		return (
			<Grid container spacing={24}>
                <Grid item xs={12}>
                    <WorkinghoursExportContainer />
                </Grid>
            </Grid>
		);
	}
}
