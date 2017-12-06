import React from 'react';

import PropTypes from 'prop-types';
import Table, { TableBody, TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';
import Typography from 'material-ui/Typography';

const columnData = [
	{ id: 'date', label: 'Datum' },
	{ id: 'project', label: 'Projekt' },
	{ id: 'title', label: 'Titel' },
	{ id: 'duration', label: 'Dauer (h)' },
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

export default class WorkingHourItemTable extends React.Component {
	static propTypes = {
		workinghours: PropTypes.array.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			order: 'asc',
			orderBy: 'date',
			sortedData: this.sortBy(props.workinghours, 'asc', 'date')
		};
	};

	componentWillReceiveProps(props) {
		this.setState({
			sortedData: this.sortBy(props.workinghours, this.state.order, this.state.orderBy)
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
					{sortedData.map(n => {
						return (
							<TableRow key={n.id}>
								<TableCell><Typography>{this.formatDate(n.date)}</Typography></TableCell>
								<TableCell><Typography>{n.project}</Typography></TableCell>
								<TableCell>
										<Typography>
											{n.title}
											{n.title.length == 0 && 'Kein Titel vorhanden'}
										</Typography>
								</TableCell>
								<TableCell><Typography>{Math.ceil(n.duration/30)/2}</Typography></TableCell>
							</TableRow>
						);
					})}
					{sortedData.length == 0 &&
							<TableRow>
								<TableCell style={{textAlign:'center'}} colSpan={4}>Keine Arbeiten gefunden</TableCell>
							</TableRow>
					}
				</TableBody>
			</Table>
		);
	}
}
