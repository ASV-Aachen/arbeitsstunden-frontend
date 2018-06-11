import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

import MemberListContainer from './MemberListContainer.jsx'

export default class UsersScreen extends Component {
	static propTypes = {
	};

	render() {
		return (
			<Grid container spacing={24}>
				<Grid item xs={12}>
					<MemberListContainer />
				</Grid>
			</Grid>
		);
	}
}
