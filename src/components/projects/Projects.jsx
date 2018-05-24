import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import DirectionsBoat from '@material-ui/icons/DirectionsBoat';


const columnData = [
	{ id: 'name', label: 'Name' },
	{ id: 'duration', label: 'Arbeitsstunden' },
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
						<span style={{float:'right'}}>Details</span>	
					</TableCell>
				</TableRow>
												
			</TableHead>
		);
	}
}

export default class Projects extends Component {
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
												<DirectionsBoat style={{float:'right', color: 'black'}} />
											</Link>
										</TableCell>
									</TableRow>
						);
					})}
					{sortedData.length === 0 &&
							<TableRow>
								<TableCell style={{textAlign:'center'}} colSpan={3}>Keine Projekte gefunden</TableCell>
							</TableRow>
					}
				</TableBody>
			</Table>
		);
	}
}
