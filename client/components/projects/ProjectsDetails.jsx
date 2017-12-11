import React from 'react';
import request from 'superagent';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';

export default class ProjectsDetails extends React.Component {
	constructor(props) {
		super(props);
	};

	componentWillMount() {
    };

	render() {
		const { season } = this.props;
		console.log(season);
		return (
			<Paper>
				<AppBar position='static'>
					<Toolbar>
						<Typography type="title" color="inherit" style={{flex:'1'}}>
							<span>Projekte</span>
						</Typography>
					</Toolbar>
					{true && <LinearProgress /> }
				</AppBar>
				TODO: Fill me oO
			</Paper>
		);
	}
}
