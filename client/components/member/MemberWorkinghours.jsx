import React from 'react';
import request from 'superagent';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

import { Config } from '../../../config.js';
import SeasonPicker from '../SeasonPicker.jsx';
import WorkingHourItemTable from './WorkingHourItemTable.jsx'

export default class MemberWorkinghours extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			seasons: [],
			selectedSeason: 0,
			currentSeason: 0,
			currentWorkinghours: [],
		};
	};

	componentWillMount() {
        this.loadInitialWorkinghours();
    };

	loadInitialWorkinghours = () => {
		const endpoint = Config.baseurl + Config.endpoints.activeMemberWorkinghours;

        request.get(endpoint)
            .set('Content-Type', 'application/json')
            .then(success => {

				const body = success.body;

				const seasonLabels = body.seasons.reduce(function(map, obj) {
					map[obj.year] = obj.label;
					return map;
				}, {});

				this.setState({
					neededHours: Math.ceil(body.neededMinutes/30)/2,
					workedHours: Math.ceil(body.workedMinutes/30)/2,
					currentWorkinghours: body.workinghours,
					selectedSeason: body.activeYear,
					currentSeason: body.activeYear,
					seasons: body.seasons.sort(function (a,b) {return b.year - a.year}),
					seasonLabels: seasonLabels
				});
            }, failure => {
                console.error("Error: getting current working hour entries (Response: ", failure.status, ")", failure);
            });
     }

	loadWorkinghours = (year) => {
		const endpoint = Config.baseurl + Config.endpoints.memberWorkinghours + year;
        request.get(endpoint)
            .set('Content-Type', 'application/json')
            .then(success => {
				const body = success.body;

				const workinghours = body.workinghourItems;
				this.setState({
					neededHours: Math.ceil(body.neededMinutes/30)/2,
					workedHours: Math.ceil(body.workedMinutes/30)/2,
					currentWorkinghours: workinghours,
				});
            }, failure => {
                console.error("Error: getting working hours (Response: ", failure.status, ")", failure);
            });
     }

	handleSeasonChanged = (newSelectedSeason) => {
		this.loadWorkinghours(newSelectedSeason);
		this.setState({
			selectedSeason: newSelectedSeason
		});
	}

	render() {
		const { currentSeason, selectedSeason, seasons, currentWorkinghours, neededHours, workedHours } = this.state;

		return (
			<Paper> 
				<AppBar position='static'>
					<Toolbar>
						<Typography type="title" color="inherit" style={{flex:'1'}}>
							<span>Arbeitsstunden { workedHours } von { neededHours } </span>
						</Typography>

						<SeasonPicker seasons={seasons} selected={selectedSeason} current={currentSeason} onChange={this.handleSeasonChanged} />
					</Toolbar>
				</AppBar>
				<WorkingHourItemTable workinghours={currentWorkinghours} />
			</Paper>
		);
	}
}
