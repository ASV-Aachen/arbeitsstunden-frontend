import React, { Component } from 'react';
import PropTypes from 'prop-types';

import WorkingHourItemTable from './WorkingHourItemTable.jsx'

export default class MemberWorkinghours extends Component {

	static propTypes = {
		workinghours: PropTypes.array.isRequired
	};

	render() {
		const { workinghours } = this.props;
		return (
				<WorkingHourItemTable workinghours={workinghours} />
		);
	}
}
