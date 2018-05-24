import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

export default class MemberDetails extends Component {
	static propTypes = {
		firstName: PropTypes.string.isRequired,
		lastName: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		intervals: PropTypes.array.isRequired
	};

	toSeasonString = (year) => {
		return year-1 + "/" + year
	}

	toHumanReadable = (status) => {
		let map = {
			"PROSPECT":"Anwärter",
			"ACTIVE": "Aktiv",
			"INACTIVE": "Inaktiv",
			"OLD_MAN": "Alter Herr",
		}
		if (map[status]) {
			return map[status];
		} else {
			return status;
		} 
	}

	render() {
		const { firstName, lastName, email, intervals } = this.props;
		return (
			<div style={{height:240}}>

				<Typography paragraph>{ firstName } { lastName }</Typography>
				<Typography paragraph>{ email }</Typography>
					<Typography>
					{ intervals.map((interval) => {
						if (interval.to === undefined) {
							let reduction = "";
							if (interval.reduction > 0) {
								reduction = "(Reduktion: " + (interval.reduction/60) + " Stunden)";
							}
							return (<span key={interval.from}> {this.toSeasonString(interval.from)} {this.toHumanReadable(interval.status)} {reduction} <br /></span>) 
						} else {
							return (<span key={interval.from}> {this.toSeasonString(interval.from)} - {this.toSeasonString(interval.to)} {this.toHumanReadable(interval.status)} <br /></span>) 
						}

					}) }
					</Typography>

				</div>
		);
	}
}
