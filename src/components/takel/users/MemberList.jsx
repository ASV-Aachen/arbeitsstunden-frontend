import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import MembersTable from './MembersTable.jsx';


class SearchField extends React.Component {
	static propTypes = {
		onChange: PropTypes.func.isRequired,
		searchFilter: PropTypes.string.isRequired,
	}

	render() {
		const { onChange, searchFilter } = this.props

		return (
			<div style={{position: 'relative', display: 'inline-block', width:'100%'}}>
				<SearchIcon style={{position: 'absolute', right: 0, top: 15, width: 20, height: 20}}/>
				<FormControl style={{width:'100%'}}>
					<InputLabel htmlFor='search'>Suche</InputLabel>
					<Input placeholder='Suche' id='search' onChange={onChange} value={searchFilter} />
				</FormControl>
			</div>
		);
	}
}

export default class MemberList extends Component {
	static propTypes = {
		members: PropTypes.array.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			searchFilter: '',
		}
	}

	handleSearchChange = (event) => {
		this.setState({
			searchFilter: event.target.value
		});
	}

	filterList = (users, searchFilter) => {
		return users.filter(function(user) {
			const aggregated = user.firstName + ' ' + user.lastName + ' ' + user.email;
			return aggregated.toLowerCase().search(searchFilter.toLowerCase()) !== -1;
		});	
	}

	render() {
		const { members } = this.props;
		const { searchFilter } = this.state;
		return (
			<div>
				<SearchField searchFilter={searchFilter} onChange={this.handleSearchChange} />
				<MembersTable  members={this.filterList(members, searchFilter)} />
			</div>
		);
	}
}
