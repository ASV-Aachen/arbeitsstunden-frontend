import React from 'react';
import PropTypes from 'prop-types';

import { Input, InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

export default class SeasonPicker extends React.PureComponent {
	static propTypes = {
		seasons: PropTypes.array.isRequired,
		selected: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
	};

	render() {

		const { seasons, selected, onChange } = this.props

		return (
			<FormControl style={{width: '100%'}}>
				<InputLabel htmlFor="asv-season">Arbeitsstundensaison</InputLabel>
				<Select value={selected}>/ 
					
					{seasons.map((season) => {
						return (
							<MenuItem
								key={season.year}
								onClick={onChange(season.year)}
							>
								{season.label}
							</MenuItem>
						);
					}, this)}

				</Select>
			</FormControl>
		);
	}
}
