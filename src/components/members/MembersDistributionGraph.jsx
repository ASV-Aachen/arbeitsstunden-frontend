import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Pie} from 'react-chartjs-2';

export default class MembersDistributionGraph extends Component {
	static propTypes = {
		labels: PropTypes.array.isRequired,
		hours: PropTypes.array.isRequired,
	};

	render() {
		const { labels, hours } = this.props;

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

		const options = {
			maintainAspectRatio: false,
			legend: {
				display: true,
				position: 'bottom',
			},
			responsive: true,
		}


		return (
			<Pie height={240} data={data} options={options} />
		);
	}
}
