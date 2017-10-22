import React from 'react';
import PropTypes from 'prop-types';

import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle, } from 'material-ui/Dialog';
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

	handleUpdateWorkinghourValue = (user, newValue) => {
		var newSelectedHours = this.state.selectedHours;
		newSelectedHours[user.id] = newValue; 

		this.setState(prevState => ({
			selectedHours: newSelectedHours 
		}));
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
				<BaseHourTextField label={"Grundstunden"} onChange={this.handleBaseHoursChanged} />
				<br />
				<br />
				<SelectedUsers values={selectedHours} users={selectedUsers} onDelete={this.handleRemoveUser} onUpdateWorkinghourValue={this.handleUpdateWorkinghourValue} />
				<br />
				<br />
				<br />
				<SearchField onChange={this.handleSearchChange} />
				<br />
				<UserList users={this.filterList(userListItems, searchFilter)} onSelect={this.handleSelectUser} />
			</span>
		);
	}
}

class BaseHourTextField extends React.PureComponent {
	static propTypes = {
		label: PropTypes.string,
		defaultValue: PropTypes.string,
		onChange: PropTypes.func.isRequired
	}
	
	static defaultProps = {
		label: "",
		defaultValue: "0.5"
	}

	render() {
		const { label, defaultValue, onChange } = this.props; 
	
		return (
			<TextField
				id="time"
				style={{width:'100%'}}
				label={label}
				type="number"
				defaultValue={defaultValue}
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
		onDelete: PropTypes.func.isRequired,
		onUpdateWorkinghourValue: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			dialogOpen: false, 
			selectedUser: {},
		}
	}

	handleOnClick = (user) => {
		this.setState({ 
			dialogOpen: true, 
			selectedUser: user,
			newWorkinghourValue: this.props.values[user.id]
		});
	}

	handleRequestCancel = () => {
		this.setState({ 
			dialogOpen: false, 
		});
	};

	handleRequestSave= () => {
		let updatedValue = this.state.newWorkinghourValue;
		this.props.onUpdateWorkinghourValue(this.state.selectedUser, updatedValue);
		this.setState({ 
			dialogOpen: false, 
		});
	};

	render() {
		const { users, values, onDelete } = this.props;
		const { dialogOpen, selectedUser } = this.state;

		return(
			<div>
				{users.map((user) => {
					return (
						<Chip
							avatar={<Avatar>{values[user.id]}</Avatar>}
							label={`${user.firstName} ${user.lastName}`} 
							key={user.id}
							onClick={() => this.handleOnClick(user)}
							onRequestDelete={() => onDelete(user)} 
							style={{float:'left'}}
						/>
					);
				}, this)}
				<Dialog open={dialogOpen} onRequestClose={this.handleRequestCancel}>
					<DialogTitle>Arbeitsstunden anpassen</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Arbeitsstunden für {`${selectedUser.firstName} ${selectedUser.lastName}`} anpassen.
						</DialogContentText>
						<BaseHourTextField defaultValue={values[selectedUser.id]} onChange={(event) => {this.setState({ newWorkinghourValue: event.target.value })}} />
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleRequestCancel} color="primary">
							Abbrechen	
						</Button>
						<Button onClick={this.handleRequestSave} color="primary">
							Speichern
						</Button>
					</DialogActions>
				</Dialog>
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
			<div style={{position: 'relative', display: 'inline-block', width:'100%'}}>
				<SearchIcon style={{position: 'absolute', right: 0, top: 15, width: 20, height: 20}}/>
				<FormControl style={{width:'100%'}}>
					<InputLabel htmlFor='search'>Suche</InputLabel>
					<Input placeholder='Suche' id='search' onChange={onChange} />
				</FormControl>
			</div>
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
