import React from 'react';
import request from 'superagent';

import Paper from 'material-ui/Paper';

export default class ProjectPage extends React.Component {
	constructor(props) {
		super(props);
	};

	componentWillMount() {
    };

	render() {
		const { projectId, season } = this.props.match.params;

		return (
			<Paper style={{position:'relative'}}>
				{projectId} <br />
				{season}
			</Paper>
		);
	}
}
