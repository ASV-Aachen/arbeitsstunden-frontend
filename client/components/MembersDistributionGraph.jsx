import React from 'react';
import request from 'superagent';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import { Config } from '../../config.js';
import {Pie} from 'react-chartjs-2';


export default class MembersDistributionGraph extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			labels: [],
			hours: [],
		}
	};

	componentWillMount() {
        this.loadGraphData();
    };
	

	loadGraphData = () => {
		const endpoint = Config.baseurl + Config.endpoints.membersGraph + "/2017";

        request.get(endpoint)
            .set('content-type', 'application/json')
            .then(success => {
				const body = success.body;

				let hours = [];
				let labels = []

				let map = {
					"PROSPECT":"Anwärter",
					"ACTIVE": "Aktiv",
					"INACTIVE": "Inaktiv",
					"QUIT": "Ausgetreten",
					"OLD_MAN": "Alter Herr",
				}

				body.map(function(item) {
					hours.push(item.minutes/60);
					labels.push(map[item.label]);
				});

				this.setState({
					hours: hours,
					labels: labels,
				});
            }, failure => {
                console.error("error: getting graph overview (response: ", failure.status, ")", failure);
            });
     }

	render() {
		const { labels, hours } = this.state;

		const data = {
			labels: labels,
			datasets: [{
				data: hours, 
				backgroundColor: [
					'#C2E0F2',
					'#F2F2F2',
					'#F2D6B3',
					'#F2C894',
					'#BF826B',
				],
				hoverBackgroundColor: [
				]
			}]
		};

		return (
			<Paper>
				<AppBar position='static'>
					<Toolbar>
						<Typography type="title" color="inherit" style={{flex:'1'}}>
							<span>Mitgliederverteilung</span>
						</Typography>
					</Toolbar>
				</AppBar>
				<Pie data={data} />
			</Paper>
		);
	}
}
