import React from 'react';
import PropTypes from 'prop-types';

import Chip from 'material-ui/Chip';
import { FormControl } from 'material-ui/Form';
import SearchIcon from 'material-ui-icons/Search';
import Input, { InputLabel } from 'material-ui/Input';
import List, {ListItem, ListItemText} from 'material-ui/List';


export default class UserPicker extends React.PureComponent {
	static propTypes = {
		users: PropTypes.array.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			searchFilter: '',
			selectedUsers: []
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

	handleSelectUser = (user) => {
		this.setState(prevState => ({
			selectedUsers: [...prevState.selectedUsers, user]
		}))
	}

	handleRemoveUser = (user) => {
		let filteredArray = this.state.selectedUsers.filter(item => item.id !== user.id)
		this.setState({selectedUsers: filteredArray});
	}

	render() {
		const { users } = this.props;
		const { searchFilter, selectedUsers } = this.state;

		const userListItems = users.filter(user => {
			var isContained = false;
			selectedUsers.forEach((selectedUser) => {
				if (selectedUser.id === user.id) {
					isContained = true;
				}
			});
			return !isContained;
		}); 

		return (
			<span>
				<SelectedUsers users={selectedUsers} onDelete={this.handleRemoveUser}/>
				<SearchField onChange={this.handleSearchChange} />
				<UserList users={this.filterList(userListItems, searchFilter)} onSelect={this.handleSelectUser} />
			</span>
		);
	}
}

class SelectedUsers extends React.PureComponent {
	static propTypes = {
		users: PropTypes.array.isRequired,
		onDelete: PropTypes.func.isRequired
	}

	render() {
		const { users, onDelete } = this.props

		return(
			<div>
				{users.map((user) => {
					return (
						<Chip
							label={`${user.firstName} ${user.lastName}`} 
							key={user.id}
							onRequestDelete={() => onDelete(user)} 
						/>
					);
				}, this)}
			</div>
		);
	}
}

class SearchField extends React.PureComponent {
	static propTypes = {
		onChange: PropTypes.func.isRequired
	}
	
	render() {
		const { onChange } = this.props

		return (
			<FormControl>
				<span>
					<SearchIcon />
					<Input placeholder='Suche' onChange={onChange} />
				</span>
			</FormControl>
		);
	}
}

class UserList extends React.PureComponent {
	static propTypes = {
		users: PropTypes.array.isRequired,
		onSelect: PropTypes.func.isRequired
	}

	render() {
		const { users, onSelect } = this.props

		return (
			<List>
				{users.map((user) => {
					return (
						<ListItem button key={user.id} onClick={() => onSelect(user)}>
							<ListItemText primary={`${user.firstName} ${user.lastName}`} secondary={user.email} />
						</ListItem>
					);
				}, this)}
			</List>
		);
	}	
}
