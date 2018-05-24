import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

export default class MembersDetails extends Component {
	static propTypes = {
		workedMinutes: PropTypes.number.isRequired,
		numMembersSailingAllowed: PropTypes.number.isRequired,
		numMembersSailingNotAllowed: PropTypes.number.isRequired,
	};

	render() {
		const { workedMinutes, numMembersSailingAllowed, numMembersSailingNotAllowed } = this.props;

		return (
			<div style={{height: 240}}>
				{workedMinutes >= 0 && <Typography paragraph>Gesamt geleistete Arbeitsstunden: {Math.ceil(workedMinutes/30)/2} </Typography>}
				{numMembersSailingAllowed > 0 && <Typography paragraph>{numMembersSailingAllowed} ASVer dürfen segeln </Typography>}
				{numMembersSailingNotAllowed > 0 && <Typography paragraph>{numMembersSailingNotAllowed} ASVer dürfen nicht segeln </Typography>}
			</div>
		);
	}
}
