import React from 'react';
import request from 'superagent';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

import { Config } from '../../config.js';
import SeasonPicker from './SeasonPicker.jsx';
import WorkingHourItemTable from './WorkingHourItemTable.jsx'

export default class MemberWorkinghours extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			seasons: [],
			selectedSeason: 0,
			currentSeason: 0,
		};
	};

	handleSeasonChanged = (newSelectedSeason) => {
		this.setState({
			selectedSeason: newSelectedSeason
		});
	}

	render() {
		const { currentSeason, selectedSeason, seasons } = this.state;

		return (
			<Paper> 
				<AppBar position='static'>
					<Toolbar>
						<Typography type="title" color="inherit" style={{flex:'1'}}>
							<span>Arbeitsstunden</span>
						</Typography>

						<SeasonPicker seasons={seasons} selected={selectedSeason} current={currentSeason} onChange={this.handleSeasonChanged} />
					</Toolbar>
				</AppBar>
				<WorkingHourItemTable workinghours={[]} />
			</Paper>
		);
	}
}
