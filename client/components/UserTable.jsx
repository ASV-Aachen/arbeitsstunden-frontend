import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from 'material-ui/Toolbar';
import Table, { TableBody, TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';

const columnData = [
	{ id: 'lastName', label: 'Name' },
	{ id: 'firstName', label: 'Vorname' },
	{ id: 'statusTBD', label: 'Status' },
	{ id: 'durationTBD', label: 'Dauer (h)' },
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
			orderBy: 'lastName'	
		};
	};

	handleRequestSort = (event, property) => {
		const orderBy = property;
		let order = 'desc';

		if (this.state.orderBy === property && this.state.order === 'desc') {
			order = 'asc';
		}

		this.setState({ 
			order: order, 
			orderBy: orderBy 
		});
	};

	sortBy = (data, order, orderBy) => {
		return data.sort(
			(a, b) => {
				if (order === 'desc') {
					return ( ( a[orderBy] == b[orderBy]) ? 0 : ( ( b[orderBy] > a[orderBy]) ? 1 : -1 ) );	
				} else {
					return ( ( a[orderBy] == b[orderBy]) ? 0 : ( ( a[orderBy] > b[orderBy]) ? 1 : -1 ) );	
				}
			}
		);
	}

	render() {
		const { order, orderBy } = this.state;
		const { users } = this.props;

		const sortedData = this.sortBy(users, order, orderBy);

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
								<TableCell>{u.lastName}</TableCell>
								<TableCell>{u.firstName}</TableCell>
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
