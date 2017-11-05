import React from 'react';
import request from 'superagent';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import { Config } from '../../config.js';

import {Bar} from 'react-chartjs-2';


export default class MemberHoursForYearsGraph extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			hours: [],
			labels: [],
			obligatoryHours: [],
		};
	};

	componentWillMount() {
        this.loadGraphData();
    };

	loadGraphData = () => {
		const endpoint = Config.baseurl + Config.endpoints.memberOverview;

        request.get(endpoint)
            .set('Content-Type', 'application/json')
            .then(success => {
				const body = success.body;

				let hours = [];
				let obligatoryHours = [];
				let labels = []

				body.map(function(item) {
					hours.push(item.minutes/60);
					labels.push(item.season.label);
					obligatoryHours.push(item.season.obligatoryMinutes/60);
				});

				this.setState({
					hours: hours,
					labels: labels,
					obligatoryHours: obligatoryHours,
				});
            }, failure => {
                console.error("Error: getting graph overview (Response: ", failure.status, ")", failure);
            });
     }

	render() {
		const { labels, hours, obligatoryHours } = this.state;

		const data = {
			labels: labels,
			datasets: [{
				label: 'Pflicht Stunden',
				data: obligatoryHours,
				backgroundColor: 'rgba(255, 235, 59, 0.5)',
			},{
				label: 'Geleistete Stunden',
				data: hours,
				backgroundColor: 'rgba(48, 63, 159, 1.0)',
			}]
		};

		const options = {
			legend: {
				display: true,
				position: 'bottom',
			},
			responsive: true,
			scales: {
				xAxes: [{
					stacked: true,
				}],
				yAxes: [{
					stacked: false,
					ticks: {
						beginAtZero: true
					},
				}]
			}
		}

		return (
			<Paper> 
				<AppBar position='static'>
					<Toolbar>
						<Typography type="title" color="inherit" style={{flex:'1'}}>
							<span>Arbeitsstunden Übersicht</span>
						</Typography>
					</Toolbar>
				</AppBar>
					
				<div style={{padding:10, paddingTop:15}}>
					<Bar data={data} options={options}/>
				</div>

			</Paper>
		);
	}
}
