import React from 'react';
import PropTypes from 'prop-types';

import { Input, InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Typography from 'material-ui/Typography';

export default class SimpleSeasonPicker extends React.PureComponent {
	static propTypes = {
		seasons: PropTypes.array.isRequired,
		selected: PropTypes.number.isRequired,
		current: PropTypes.number.isRequired,
		onChange: PropTypes.func.isRequired,
	};

	getSeasonLabel = (current, year, label) => {
		if (year == current) {
			return label + " (aktuelle)";	
		} else if(year == current - 1) {
			return label + " (vorherige)";	
		} else if(year == current + 1) {
			return label + " (nächste)";
		} else {
			return label;
		}
	}

	render() {
		const { seasons, selected, current, onChange } = this.props

		return (
			<span>
				<FormControl>
					<Select value={selected} onChange={event => onChange(event.target.value)} style={{width:200}}> 
						{seasons.map((season) => {
							return (
								<MenuItem
									key={season.year}
									value={season.year}
								>
									<Typography type="subheading" color="inherit" align={'left'} style={{flex:'1'}}>
										{this.getSeasonLabel(current, season.year, season.label)}
									</Typography>
								</MenuItem>
							);
						}, this)}
					</Select>
				</FormControl>
			</span>
		);
	}
}
