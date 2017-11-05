import React from 'react';
import request from 'superagent';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import { Config } from '../../config.js';

export default class MemberDetails extends React.Component {
	constructor(props) {
		super(props);
	};

	render() {
		return (
			<Paper> 
				<AppBar position='static'>
					<Toolbar>
						<Typography type="title" color="inherit" style={{flex:'1'}}>
							<span>Daten</span>
						</Typography>
					</Toolbar>
				</AppBar>
				Ralf Bettermann<br />
				ralf.bettermann@rwth-aachen.de<br />
				Status: aktiv
			</Paper>
		);
	}
}
