import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

import SeasonPicker from '../../SimpleSeasonPicker.jsx';

export default class WorkinghoursExport extends Component {
	static propTypes = {
		activeSeason: PropTypes.number.isRequired,
		seasons: PropTypes.array.isRequired,
		onDownload: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			selectedSeason: this.props.activeSeason,
		};
	};F

	componentWillReceiveProps(newProps){
      if (this.state.selectedSeason === 0) {
		  this.setState({
		  	selectedSeason: newProps.activeSeason,
			selectedUsers: [] 
		  });
      }
	}

	handleSeasonChanged = (newSelectedSeason) => {
        this.setState({
            selectedSeason: newSelectedSeason
        });
    }

	render() {
		const { selectedSeason } = this.state;
		const { activeSeason } = this.props;

		return (
			<div style={{padding:15}}>
                <SeasonPicker seasons={this.props.seasons} selected={selectedSeason} current={activeSeason} onChange={this.handleSeasonChanged}/>
                <br />
                <br />
                <Button variant='raised' onClick={()=>this.props.onDownload(selectedSeason)}>
                    Download
                </Button>
            </div>
		);
	}
}
