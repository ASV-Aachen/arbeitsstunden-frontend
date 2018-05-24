import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

export default class ProjectsDetails extends Component {
	static propTypes = {
		numberProjects: PropTypes.number.isRequired,
		projects: PropTypes.array.isRequired
	};

	render() {
		const { numberProjects, projects } = this.props;
		return (
			<div style={{height:240}}>
				<Typography paragraph>{numberProjects} Projekte</Typography>
				<Typography>Top Projekte:</Typography>

				{ projects.length === 0 && 
					<Typography>Keine Projekte mit Arbeitstunden vorhanden</Typography>
				}

				{ projects.map((project, index)=>
					<Typography key={index}>
						{index+1}. {project.name} {project.duration / 60} Stunden ({project.numberMembers} Mitglieder) <br />
						&nbsp;&nbsp;&nbsp;&nbsp;Meiste Stunden: {project.maxMember} {project.maxMemberMinutes / 60} Stunden
					</Typography>
				) 
				}
			</div>
		);
	}
}
