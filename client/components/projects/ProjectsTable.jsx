import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Toolbar from 'material-ui/Toolbar';
import Table, { TableBody, TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';

import MoreHoriz from 'material-ui-icons/MoreHoriz';

const columnData = [
	{ id: 'name', label: 'Name' },
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
					<TableCell>
					</TableCell>
				</TableRow>
												
			</TableHead>
		);
	}
}

export default class ProjectTable extends React.Component {
	static propTypes = {
		projects: PropTypes.array.isRequired,
		season: PropTypes.number.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			order: 'asc',
			orderBy: 'name',
			sortedData: this.sortBy(props.projects, 'asc', 'name'),
			season:props.season,
		};
	};

	componentWillReceiveProps(props) {
		this.setState({
			sortedData: this.sortBy(props.projects, this.state.order, this.state.orderBy),
			season: props.season,
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

	render() {
		const { sortedData, order, orderBy, season } = this.state;

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
										<TableCell>{n.name}</TableCell>
										<TableCell>{Math.ceil(n.duration/30)/2}</TableCell>
										<TableCell>
											<Link to={"/project/"+encodeURIComponent(n.name)+"/"+season+"/"+n.id}>
												<MoreHoriz style={{float:'right'}} />
											</Link>
										</TableCell>
									</TableRow>
						);
					})}
					{sortedData.length == 0 &&
							<TableRow>
								<TableCell style={{textAlign:'center'}} colSpan={3}>Keine Projekte gefunden</TableCell>
							</TableRow>
					}
				</TableBody>
			</Table>
		);
	}
}
