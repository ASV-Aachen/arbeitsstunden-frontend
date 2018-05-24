import React from 'react';
import PropTypes from 'prop-types';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default class ProjectPicker extends React.PureComponent {
	static propTypes = {
		projects: PropTypes.array.isRequired,
		selected: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
	};

	render() {

		const { projects, selected, onChange } = this.props

		return (
			<FormControl required style={{width: '100%'}}>
				<InputLabel htmlFor="asv-project">Projekt</InputLabel>
				<Select value={selected} onChange={event => onChange(event.target.value)}> 
					
					{projects.map((project) => {
						return (
							<MenuItem
								key={project.id}
								value={project.id}
							>
								{project.name}
							</MenuItem>
						);
					}, this)}

				</Select>
			</FormControl>
		);
	}
}
