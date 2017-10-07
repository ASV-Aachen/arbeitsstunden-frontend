import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from 'material-ui/Toolbar';
import Table, { TableBody, TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';

const columnData = [
	{ id: 'lastname', label: 'Name' },
	{ id: 'firstname', label: 'Vorname' },
	{ id: 'status', label: 'Status' },
	{ id: 'duration', label: 'Dauer (h)' },
	{ id: 'segelstatussTBD', label: 'SegelstatusTBD' },
];

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
				</TableRow>
			</TableHead>
		);
	}
}

export default class ProjectTable extends React.Component {
	static propTypes = {
		users: PropTypes.array.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			order: 'asc',
			orderBy: 'name',
			sortedData: this.sortBy(props.users, 'asc', 'name')
		};
	};

	componentWillReceiveProps(props) {
		this.setState({
			sortedData: this.sortBy(props.users, this.state.order, this.state.orderBy)
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
				(a, b) => (order === 'desc' ? b[orderBy] > a[orderBy] : a[orderBy] > b[orderBy])
			);
		}
	}

	render() {
		const { sortedData, order, orderBy } = this.state;

		return (
			<Table>
				<EnhancedTableHead
					order={order}
					orderBy={orderBy}
					onRequestSort={this.handleRequestSort}
				/>
				<TableBody>
					{sortedData.map(u => {
						return (
							<TableRow key={u.id}>
								<TableCell>{u.firstName}</TableCell>
								<TableCell>{u.lastName}</TableCell>
								<TableCell>{u.status}</TableCell>
								<TableCell>{u.duration}</TableCell>
								<TableCell>{u.sailingStatus}</TableCell>

							</TableRow>
						);
					})}
					{sortedData.length == 0 &&
							<TableRow>
								<TableCell style={{textAlign:'center'}} colSpan={3}>Keine Mitglieder gefunden</TableCell>
							</TableRow>
					}
				</TableBody>
			</Table>
		);
	}
}
