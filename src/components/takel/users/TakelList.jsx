import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MembersTable from './MembersTable.jsx';

export default class TakelList extends Component {
	static propTypes = {
		members: PropTypes.array.isRequired,
	};

	render() {
		const { members } = this.props;
		return (
			<div>
				<MembersTable  members={members} />
			</div>
		);
	}
}
