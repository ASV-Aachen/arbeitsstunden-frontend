import React from 'react';

import PropTypes from 'prop-types';
import Table, { TableBody, TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
	

import Launch from 'material-ui-icons/Launch';

const columnData = [
	{ id: 'date', label: 'Datum' },
	{ id: 'title', label: 'Titel' },
	{ id: 'duration', label: 'Dauer (h)' },
];

class WorkingHourItemDetailDialog extends React.Component {

	formatDate = (dateString) => {
		var date = new Date(dateString);
		var d = date.getDate();
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
		return '' + (d <= 9 ? '0' + d : d) + '.' + (m<=9 ? '0' + m : m) + '.' + y ;
	}

	render() {

		const { open, onRequestClose, item } = this.props;

		if (item == undefined) {
			return (<span></span>);
		}

		return (
			<Dialog open={open} onRequestClose={onRequestClose}>
			  <DialogTitle>{item.title}</DialogTitle>
			  <DialogContent>
				<Typography paragraph type="body1">
					<b>
					{this.formatDate(item.date)}: {Math.ceil(item.duration/30)/2} Stunden
					</b>
				</Typography>
				<DialogContentText>
					{item.description}
				</DialogContentText>
					<br />
					{item.minutes.map(minute => {
						let member = minute.member;
						return (
							<Chip
								key={member.id}
								avatar={<Avatar>{Math.ceil(minute.duration/30)/2}</Avatar>}
								label={`${member.firstName} ${member.lastName}`} 
								style={{float:'left', marginRight:10, marginBottom:10}}
							/>
						);
					}, this)}
			  </DialogContent>
			  <DialogActions>
				<Button onClick={onRequestClose} color="primary">
					Schließen 
				</Button>
          </DialogActions>
        </Dialog>
		);
	}
}

class EnhancedTableHead extends React.Component {
	static propTypes = {
		onRequestSort: PropTypes.func.isRequired,
		order: PropTypes.string.isRequired,
		orderBy: PropTypes.string.isRequired,
	};

	createSortHandler = property => event => {
		this.props.onRequestSort(event, property);
	};

	render() {
		const { order, orderBy } = this.props;

		return (
			<TableHead>
				<TableRow>
					{columnData.map(column => {
						return (
							<TableCell key={column.id}>
								<TableSortLabel
									active={orderBy === column.id}
									direction={order}
									onClick={this.createSortHandler(column.id)}
								>
									{column.label}
								</TableSortLabel>
							</TableCell>
						);
					}, this)}
					<TableCell>
					</TableCell>
				</TableRow>
			</TableHead>
		);
	}
}

export default class ProjectWorkingHourItemTable extends React.Component {
	static propTypes = {
		items: PropTypes.array.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			order: 'desc',
			orderBy: 'date',
			sortedData: this.sortBy(props.items, 'asc', 'date')
		};
	};

	componentWillReceiveProps(props) {
		this.setState({
			sortedData: this.sortBy(props.items, this.state.order, this.state.orderBy)
		});
	}

	handleRequestSort = (event, property) => {
		const orderBy = property;
		let order = 'desc';

		if (this.state.orderBy === property && this.state.order === 'desc') {
			order = 'asc';
		}

		const newSortedData = this.sortBy(this.state.sortedData, order, orderBy)

		this.setState({ newSortedData, order, orderBy });
	};

	sortBy = (data, order, orderBy) => {
		if (orderBy == 'duration') {
			return data.sort(
				(a, b) => (order === 'desc' ? b[orderBy] - a[orderBy] : a[orderBy] - b[orderBy])
			);
		} else {
			return data.sort(
				(a, b) => (order === 'desc' ? 0 - (a[orderBy] > b[orderBy] ? 1 : -1) : 0 - (b[orderBy] > a[orderBy] ? 1 : -1 ))
			);
		}
	}

	formatDate = (dateString) => {
		var date = new Date(dateString);
		var d = date.getDate();
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
		return '' + (d <= 9 ? '0' + d : d) + '.' + (m<=9 ? '0' + m : m) + '.' + y ;
	}

	handleRequestClose = () => {
		this.setState({detailsOpen: false});
	}

	render() {
		const { sortedData, order, orderBy, selectedItem, detailsOpen } = this.state;

		return (
			<span>
				<WorkingHourItemDetailDialog open={detailsOpen} item={selectedItem} onRequestClose={this.handleRequestClose}/>
				<Table>
					<EnhancedTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={this.handleRequestSort}
					/>
					<TableBody>
						{sortedData.map(n => {
							return (
								<TableRow key={n.id}>
									<TableCell>{this.formatDate(n.date)}</TableCell>
									<TableCell>{n.title}</TableCell>
									<TableCell>{Math.ceil(n.duration/30)/2}</TableCell>
									<TableCell>
										<Launch onClick={()=>{this.setState({selectedItem: n, detailsOpen: true})}} />
									</TableCell>
								</TableRow>
							);
						})}
						{sortedData.length == 0 &&
								<TableRow>
									<TableCell style={{textAlign:'center'}} colSpan={4}>Keine Arbeitsstunden gefunden</TableCell>
								</TableRow>
						}
					</TableBody>
				</Table>
			</span>
		);
	}
}
