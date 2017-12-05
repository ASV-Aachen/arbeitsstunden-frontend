import React from 'react';
import request from 'superagent';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import { Config } from '../../config.js';

export default class MembersDistributionGraph extends React.Component {
	constructor(props) {
		super(props);
	};

	render() {
		return (
			<Paper>
				<AppBar position='static'>
					<Toolbar>
						<Typography type="title" color="inherit" style={{flex:'1'}}>
							<span>Mitgliederverteilung</span>
						</Typography>
					</Toolbar>
				</AppBar>
				TODO: Mitgliederverteilung 
			</Paper>
		);
	}
}