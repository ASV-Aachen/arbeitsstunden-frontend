import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


export default class MemberEditDialogContainer extends Component {
	static propTypes = {
		seasons: PropTypes.array.isRequired,
		handleStatusChange: PropTypes.func.isRequired,
		handleReductionChange: PropTypes.func.isRequired,
		handleCancel: PropTypes.func.isRequired,
		handleEditUser: PropTypes.func.isRequired,
		handlePasswordReset: PropTypes.func.isRequired,
	};

	render() {
		const { seasons } = this.props;

		return (
			<div>
			        <Button variant='raised' onClick={this.props.handlePasswordReset}>
                        Passwort Reset
                    </Button>
					<Table>
						<TableHead>
						  <TableRow>
							<TableCell>Saison</TableCell>
							<TableCell>Reduktion (h)</TableCell>
							<TableCell>Status</TableCell>
						  </TableRow>
						</TableHead>
						<TableBody>
						  {seasons.map(season => {
							return (
							  <TableRow key={season.year}>
								<TableCell>{season.year-1}/{season.year}</TableCell>
								<TableCell><Input value={season.reduction/60} onChange={(e)=>this.props.handleReductionChange(season.year, e)}/></TableCell>
								<TableCell>

									<Select value={season.asvStatus} onChange={(e)=>this.props.handleStatusChange(season.year, e)} input={<Input id="asv-status" />} ref='status'>
										<MenuItem value={"PROSPECT"}>Anwärter</MenuItem>
										<MenuItem value={"ACTIVE"}>Aktiv</MenuItem>
										<MenuItem value={"INACTIVE"}>Inaktiv</MenuItem>
										<MenuItem value={"OLD_MAN"}>Alter Herr</MenuItem>
										<MenuItem value={"GUEST"}>Gast</MenuItem>
										<MenuItem value={"QUIT"}>Ausgetreten</MenuItem>
									</Select>

								</TableCell>
							  </TableRow>
							);
						  })}
						</TableBody>
					  </Table>

					<Grid container style={{textAlign:'center', paddingTop:'20px', paddingBottom: '10px'}}>
						<Grid item sm={6}>
							<Button variant='raised' onClick={this.props.handleCancel}>
								Abbrechen
							</Button>
						</Grid>
						<Grid item sm={6}>
							<Button variant='raised' onClick={this.props.handleEditUser}>
								Speichern	
							</Button>
						</Grid>
					</Grid>

			</div>
		);
	}
}
