import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

export default class ProjectDetails extends Component {
	static propTypes = {
		season: PropTypes.number.isRequired,
		description: PropTypes.string.isRequired,
		percentage: PropTypes.number.isRequired,

		maxOverallMember: PropTypes.string,
		maxOverallMinutes: PropTypes.number,
		maxSeasonMember: PropTypes.string,
		maxSeasonMinutes: PropTypes.number,
	};

	render() {

		const { season, description, percentage, maxOverallMember, maxOverallMinutes, maxSeasonMinutes, maxSeasonMember } = this.props;

		return (
			<div style={{height: 240}}>
				<Typography paragraph>{ description }</Typography>
				<Typography paragraph>Arbeitstundensaison <b>{ season-1 }/{ season }</b></Typography>
				<Typography paragraph>{ (percentage * 100).toFixed(2) }% von allen Projekten</Typography>
				{maxSeasonMinutes && <Typography paragraph>Saison: {maxSeasonMember} ({Math.ceil(maxSeasonMinutes/30)/2} Stunden) </Typography>}
				{maxOverallMinutes && <Typography paragraph>Overall: {maxOverallMember} ({Math.ceil(maxOverallMinutes/30)/2} Stunden)</Typography>}
			</div>
		);
	}
}
