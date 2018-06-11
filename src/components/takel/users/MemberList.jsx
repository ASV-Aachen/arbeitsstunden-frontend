import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import MembersTable from './MembersTable.jsx';

export default class MemberList extends Component {
	static propTypes = {
		members: PropTypes.array.isRequired,
	};

	render() {
		const { members } = this.props;
		return (
			<div>
				<Typography paragraph>Memberlist</Typography>
				<MembersTable  members={members} />
			</div>
		);
	}
}
