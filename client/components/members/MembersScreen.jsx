import React from 'react';
import request from 'superagent';

import Grid from 'material-ui/Grid';

import { Config } from '../../../config.js';
import MembersSummary from './MembersSummary.jsx'
import MembersDistributionGraph from './MembersDistributionGraph.jsx'
import MembersList from './MembersList.jsx'

export default class MembersScreen extends React.Component {
	constructor(props) {
		super(props);
	};

	render() {
		return (
			<Grid container spacing={24}>
				<Grid item xs={12} sm={6}>
					<MembersSummary />
				</Grid>
				<Grid item xs={12} sm={6}>
					<MembersDistributionGraph />
				</Grid>
				<Grid item xs={12}>
					<MembersList season={2017} />
				</Grid>
			</Grid>
		);
	}
}
