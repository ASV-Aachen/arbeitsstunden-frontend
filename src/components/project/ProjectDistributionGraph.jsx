import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Line} from 'react-chartjs-2';

export default class ProjectDistributionGraph extends Component {
	static propTypes = {
		labels: PropTypes.array.isRequired,
		values: PropTypes.array.isRequired,
	};

	render() {
		const { labels, values } = this.props;

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
			maintainAspectRatio: false,
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
			<div style={{padding:10, paddingTop:15, height:215}}>
				<Line data={data} options={options} />
			</div>
		);
	}
}
