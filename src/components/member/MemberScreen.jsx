import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

import { getCurrentMemberId } from '../HOC';
import MemberWorkinghoursContainer from './MemberWorkinghoursContainer.jsx'
import MemberDetailsContainer from './MemberDetailsContainer.jsx' 
import MemberHoursGraphContainer from './MemberHoursGraphContainer.jsx'  

export default class MemberScreen extends Component {
	getMemberId = () => {
		const memberId = this.props.match.params.memberId;
		return memberId ? memberId : getCurrentMemberId();
	}

	render() {
		return (
			<Grid container spacing={24}>
				<Grid item xs={12} sm={6}>
					<MemberDetailsContainer memberId={ this.getMemberId() } />
				</Grid>
				<Grid item xs={12} sm={6}>
					<MemberHoursGraphContainer memberId={ this.getMemberId() } />
				</Grid>
				<Grid item xs={12}>
					<MemberWorkinghoursContainer memberId={this.getMemberId()} />
				</Grid>
			</Grid>
		);
	}
}
