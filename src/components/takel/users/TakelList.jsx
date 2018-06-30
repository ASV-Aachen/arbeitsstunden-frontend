import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

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
