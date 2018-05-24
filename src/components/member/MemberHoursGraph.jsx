import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Bar} from 'react-chartjs-2';

export default class MemberHoursGraph extends Component {

	static propTypes = {
		labels: PropTypes.array.isRequired,
		hours: PropTypes.array.isRequired,
		obligatoryHours: PropTypes.array.isRequired
	};

	render() {
		const { labels, hours, obligatoryHours } = this.props;

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
				<Bar data={data} options={options} />
			</div>
		);
	}
}
