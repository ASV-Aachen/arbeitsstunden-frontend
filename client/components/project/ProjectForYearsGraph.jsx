import React from 'react';
import request from 'superagent';
import Cookies from 'universal-cookie';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import {Line} from 'react-chartjs-2';
import { Config } from '../../../config.js';


export default class ProjectForYearsGraph extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			labels: [],
			values: [],
		}

	};

	componentWillMount() {
		this.loadProjectForYears();
    };

	loadProjectForYears = () => {
		const { projectId, season } = this.props;
		const endpoint = Config.baseurl + Config.endpoints.projectYears+ "/" + projectId;
		const cookies = new Cookies();
		let user = cookies.get('username');
		let pass = cookies.get('password');

        request.get(endpoint)
			.auth(user, pass)
            .set('Content-Type', 'application/json')
            .then(success => {
				const body = success.body;

				let sortedItems = body.sort(function (a,b) {return a.season - b.season});
				this.setState({
					labels: sortedItems.map(item => item.season),
					values: sortedItems.map(item => Math.ceil(item.duration/30)/2),

					
				});
            }, failure => {
                console.error("Error: getting project details (Response: ", failure.status, ")", failure);
            });
     }

	render() {

		const { labels, values } = this.state;

		const data = {
		  labels: labels,
		  datasets: [
			{
			  label: 'Arbeitsstunden',
			  fill: false,
			  lineTension: 0.1,
			  backgroundColor: 'rgba(75,192,192,0.4)',
			  borderColor: 'rgba(75,192,192,1)',
			  borderCapStyle: 'butt',
			  borderDash: [],
			  borderDashOffset: 0.0,
			  borderJoinStyle: 'miter',
			  pointBorderColor: 'rgba(75,192,192,1)',
			  pointBackgroundColor: '#fff',
			  pointBorderWidth: 1,
			  pointHoverRadius: 5,
			  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
			  pointHoverBorderColor: 'rgba(220,220,220,1)',
			  pointHoverBorderWidth: 2,
			  pointRadius: 1,
			  pointHitRadius: 10,
			  data: values 
			}
		  ]
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
			<Paper style={{height:300}}> 
				<AppBar position='static'>
					<Toolbar>
						<Typography type="title" color="inherit" style={{flex:'1'}}>
							<span>Entwicklung</span>
						</Typography>
					</Toolbar>
				</AppBar>
				<div style={{padding:10, paddingTop:15}}>
        			<Line data={data} options={options} />
				</div>
			</Paper>
		);
	}
}
