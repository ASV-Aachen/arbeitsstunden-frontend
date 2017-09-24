import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from 'material-ui/Toolbar';
import Table, { TableBody, TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';

const columnData = [
  { id: 'name', label: 'Name' },
  { id: 'duration', label: 'Dauer (h)' },
];

const tableData = [
	{
		id: '1',
		name: '470er Selvstarter',
		duration: 31,
	},
	{
		id: '2',
		name: 'AG IV',
		duration: 1689,
	},
	{
		id: '3',
		name: 'ASV Allgemein',
		duration: 57,
	},
	{
		id: '4',
		name: 'Ausbildung',
		duration: 290,
	},
	{
		id: '5',
		name: 'Cameron Dyas',
		duration: 49,
	},
	{
		id: '6',
		name: 'Dyas Rudolph Rotnase',
		duration: 247,
	},
	{
		id: '7',
		name: 'Etage',
		duration: 147.5,
	},
	{
		id: '8',
		name: 'Folkeboot Amme',
		duration: 1250,
	},
	{
		id: '9',
		name: 'Halle Aachen',
		duration: 1337,
	},

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
              <TableCell
                key={column.id}
              >
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
  state = {
    order: 'asc',
    orderBy: 'name',
    data: tableData,
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data = this.state.data.sort(
      (a, b) => (order === 'desc' ? b[orderBy] > a[orderBy] : a[orderBy] > b[orderBy]),
    );

    this.setState({ data, order, orderBy });
  };

  render() {
    const { data, order, orderBy } = this.state;

   const style = {
   	textAlign: 'center',
   }

    return (
        <Table>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={this.handleRequestSort}
          />
          <TableBody>
            {data.map(n => {
              return (
		<TableRow key={n.id}>
			<TableCell>{n.name}</TableCell>
			<TableCell>{n.duration}</TableCell>
                </TableRow>
              );
            })}
	    {data.length == 0 && 
	    	<TableRow>
			<TableCell style={style} colSpan={3}>Keine Projekte gefunden</TableCell>
		</TableRow>
	    }
          </TableBody>
        </Table>
    );
  }
}
