import React from 'react';
import request from 'superagent';

import Grid from 'material-ui/Grid';

import CreateSeason from './CreateSeason.jsx';
import CreateWorkinghour from './CreateWorkinghour.jsx';

export default class ProjectPage extends React.Component {
	constructor(props) {
		super(props);
	};

	render() {
		const { projectId, season } = this.props.match.params;

		return (
			<Grid container spacing={24}>
				<Grid item xs={12} sm={6}>
					<CreateSeason />
				</Grid>
				<Grid item xs={12} sm={6}>
				</Grid>
				<Grid item xs={12}>
					<CreateWorkinghour />
				</Grid>
			</Grid>
		);
	}
}
