import React from 'react';
import PropTypes from 'prop-types';

import { Input, InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

export default class ProjectPicker extends React.PureComponent {
	static propTypes = {
		projects: PropTypes.array.isRequired,
		selected: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
	};

	render() {

		const { projects, selected, onChange } = this.props

		return (
			<FormControl style={{width: '100%'}}>
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
