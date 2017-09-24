import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from 'material-ui/Toolbar';
import Table, { TableBody, TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';

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

  static propTypes = {
    projects: PropTypes.array.isRequired,
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

  constructor(props) {
	  super(props);

	  this.state = {
	    order: 'asc',
	    orderBy: 'name',
	    data: props.projects,
	  };
  }

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
