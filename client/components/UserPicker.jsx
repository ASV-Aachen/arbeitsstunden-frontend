import React from 'react';
import PropTypes from 'prop-types';

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import { FormControl } from 'material-ui/Form';
import SearchIcon from 'material-ui-icons/Search';
import Input, { InputLabel } from 'material-ui/Input';
import List, {ListItem, ListItemText} from 'material-ui/List';
import TextField from 'material-ui/TextField';


export default class UserPicker extends React.PureComponent {
	static propTypes = {
		users: PropTypes.array.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			baseHours: '0.5',
			searchFilter: '',
			selectedUsers: [],
			selectedHours: {}
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
		var newSelectedHours = this.state.selectedHours;
		newSelectedHours[user.id] = this.state.baseHours;

		this.setState(prevState => ({
			selectedUsers: [...prevState.selectedUsers, user],
			selectedHours: newSelectedHours 
		}));
	}

	handleRemoveUser = (user) => {
		var newSelectedHours = this.state.selectedHours;
		delete newSelectedHours[user.id];

		let filteredArray = this.state.selectedUsers.filter(item => item.id !== user.id);
		this.setState({
			selectedUsers: filteredArray,
			selectedHours: newSelectedHours
		});
	}

	handleBaseHoursChanged = (event) => {
		const baseHours = event.target.value;
		if (baseHours.length > 0) {
			this.setState({baseHours: baseHours});
		} 
	} 

	render() {
		const { users } = this.props;
		const { baseHours, searchFilter, selectedUsers, selectedHours } = this.state;

		const userListItems = users.filter(user => {
			let isContained = false;
			selectedUsers.forEach((selectedUser) => {
				if (selectedUser.id === user.id) {
					isContained = true;
				}
			});
			return !isContained;
		}); 

		return (
			<span>
				<BaseHourTextField onChange={this.handleBaseHoursChanged} />
				<SelectedUsers values={selectedHours} users={selectedUsers} onDelete={this.handleRemoveUser}/>
				<SearchField onChange={this.handleSearchChange} />
				<UserList users={this.filterList(userListItems, searchFilter)} onSelect={this.handleSelectUser} />
			</span>
		);
	}
}

class BaseHourTextField extends React.PureComponent {
	static propTypes = {
		onChange: PropTypes.func.isRequired
	}

	render() {
		const { onChange } = this.props; 
	
		return (
			<TextField
				id="time"
				label="Grundstunden"
				type="number"
				defaultValue="0.5"
				onChange={onChange}
				InputLabelProps={{
					shrink: true,
				}}
				inputProps={{
					step: .5, // 30 min
					min: 0.5,
					max: 24
				}}
			/>
		); 

	}

}

class SelectedUsers extends React.PureComponent {
	static propTypes = {
		users: PropTypes.array.isRequired,
		values: PropTypes.object.isRequired,
		onDelete: PropTypes.func.isRequired
	}

	render() {
		const { users, values, onDelete } = this.props

		return(
			<div>
				{users.map((user) => {
					return (
						<Chip
							avatar={<Avatar>{values[user.id]}</Avatar>}
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
			<List style={{height:500, overflow: 'auto'}}>
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
