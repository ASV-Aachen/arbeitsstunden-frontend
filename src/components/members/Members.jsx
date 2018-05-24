import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';

const columnData = [
	{ id: 'firstName', label: 'Vorname' },
	{ id: 'lastName', label: 'Nachname' },
	{ id: 'status', label: 'Status' },
	{ id: 'workedMinutes', label: 'Stunden' },
	{ id: 'todoMinutes', label: 'Segeln?' },
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
					<TableCell>
					</TableCell>
				</TableRow>
												
			</TableHead>
		);
	}
}

export default class Members extends Component {
	static propTypes = {
		members: PropTypes.array.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			order: 'asc',
			orderBy: 'lastName',
			sortedData: this.sortBy(props.members , 'asc', 'lastName'),
		};
	};

	componentWillReceiveProps(props) {
		this.setState({
			sortedData: this.sortBy(props.members , this.state.order, this.state.orderBy),
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
		if (orderBy === 'duration') {
			return data.sort(
				(a, b) => (order === 'desc' ? b[orderBy] - a[orderBy] : a[orderBy] - b[orderBy])
			);
		} else {
			return data.sort(
				(a, b) => (order === 'desc' ? 0 - (a[orderBy] > b[orderBy] ? 1 : -1) : 0 - (b[orderBy] > a[orderBy] ? 1 : -1 ))
			);
		}
	}

	toHumanReadable = (status) => {
		let map = {
			"PROSPECT":"Anwärter",
			"ACTIVE": "Aktiv",
			"INACTIVE": "Inaktiv",
			"QUIT": "Ausgetreten",
			"OLD_MAN": "Alter Herr",
		}
		if (map[status]) {
			return map[status];
		} else {
			return status;
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
					{sortedData.map(n => {
						return (
									<TableRow key={n.memberId}>
										<TableCell><Typography>{n.firstName}</Typography></TableCell>
										<TableCell><Typography>{n.lastName}</Typography></TableCell>
										<TableCell><Typography>{this.toHumanReadable(n.status)}</Typography></TableCell>
										<TableCell><Typography>{Math.ceil(n.workedMinutes/30)/2}</Typography></TableCell>
										<TableCell style={{position:"relative"}}>
											{ 
												n.workedMinutes >= n.neededMinutes ?

												 <Tooltip placement="left" title={Math.ceil(n.workedMinutes/30)/2 + "/" + Math.ceil(n.neededMinutes/30)/2 +" Stunden"} >
													<ThumbUp style={{color:"green"}} /> 
												</Tooltip>

												: 
												 <Tooltip placement="left" title={"Fehlende Stunden: " + Math.ceil((n.neededMinutes - n.workedMinutes)/30)/2 }>

												<ThumbDown style={{color:"red"}}/> 
												</Tooltip>
											}
										</TableCell>
									</TableRow>
						);
					})}
					{sortedData.length === 0 &&
							<TableRow>
								<TableCell style={{textAlign:'center'}} colSpan={5}>Keine Mitglieder mit Arbeitstunden gefunden</TableCell>
							</TableRow>
					}
				</TableBody>
			</Table>
		);
	}
}
