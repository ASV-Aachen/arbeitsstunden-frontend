import React from 'react';
import request from 'superagent';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';

export default class ProjectsSummary extends React.Component {
	constructor(props) {
		super(props);
	};

	componentWillMount() {
    };

	render() {
		return (
			<Paper>
				<AppBar position='static'>
					<Toolbar>
						<Typography type="title" color="inherit" style={{flex:'1'}}>
							<span>Zusammenfassung</span>
						</Typography>
					</Toolbar>
					{true && <LinearProgress /> }
				</AppBar>
				TODO: Fill me oO
			</Paper>
		);
	}
}
