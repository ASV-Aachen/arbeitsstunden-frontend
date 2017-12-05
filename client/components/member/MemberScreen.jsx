import React from 'react';
import request from 'superagent';

import Grid from 'material-ui/Grid';

import { Config } from '../../../config.js';
import MemberDetails from './MemberDetails.jsx'
import MemberHoursForYearsGraph from './MemberHoursForYearsGraph.jsx'
import MemberWorkinghours from './MemberWorkinghours.jsx'

export default class MemberScreen extends React.Component {
	constructor(props) {
		super(props);
	};

	render() {
		return (
			<Grid container spacing={24}>
				<Grid item xs={12} sm={6}>
					<MemberDetails />
				</Grid>
				<Grid item xs={12} sm={6}>
					<MemberHoursForYearsGraph />
				</Grid>
				<Grid item xs={12}>
					<MemberWorkinghours />
				</Grid>
			</Grid>
		);
	}
}
