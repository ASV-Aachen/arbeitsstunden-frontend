import React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default class SimpleSeasonPicker extends React.PureComponent {
	static propTypes = {
		seasons: PropTypes.array.isRequired,
		selected: PropTypes.number.isRequired,
		current: PropTypes.number.isRequired,
		onChange: PropTypes.func.isRequired,
	};

	getSeasonLabel = (current, year, label) => {
		if (year === current) {
			return label + " (aktuelle)";	
		} else if(year === current - 1) {
			return label + " (vorherige)";	
		} else if(year === current + 1) {
			return label + " (nächste)";
		} else {
			return label;
		}
	}

	render() {
		const { seasons, selected, current, onChange } = this.props

		return (
				<FormControl>
					<Select value={selected} onChange={event => onChange(event.target.value)} 
			style={{width:200, marginTop: 12}}
			> 
						{seasons.map((season) => {
							return (
								<MenuItem
									key={season.year}
									value={season.year}
								>
										{this.getSeasonLabel(current, season.year, season.label)}
								</MenuItem>
							);
						}, this)}
					</Select>
				</FormControl>
		);
	}
}
