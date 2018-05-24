import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';


export default class UserPicker extends React.PureComponent {
	static propTypes = {
		users: PropTypes.array.isRequired,
		onChange: PropTypes.func.isRequired,
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
			selectedHours: newSelectedHours,
			searchFilter: '',
		}));

		this.props.onChange([...this.state.selectedUsers, user], newSelectedHours)

	}

	handleRemoveUser = (user) => {
		var newSelectedHours = this.state.selectedHours;
		delete newSelectedHours[user.id];

		let filteredArray = this.state.selectedUsers.filter(item => item.id !== user.id);
		this.setState({
			selectedUsers: filteredArray,
			selectedHours: newSelectedHours
		});
	
		this.props.onChange(filteredArray , newSelectedHours)
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
		
		this.props.onChange(this.state.selectedUsers, newSelectedHours);
	}

	render() {
		const { users } = this.props;
		const { searchFilter, selectedUsers, selectedHours } = this.state;

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
				<SearchField searchFilter={searchFilter} onChange={this.handleSearchChange} />
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
			//	inputProps={{
			//		step: .5, // 30 min
			//		min: 0.5,
			//		max: 24
			//	}}
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
							onDelete={() => onDelete(user)} 
							style={{float:'left'}}
						/>
					);
				}, this)}
				<Dialog open={dialogOpen} onClose={this.handleRequestCancel}>
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
