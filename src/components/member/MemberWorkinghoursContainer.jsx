import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import { withWidget, getAuthorized } from '../HOC'; 
import API from '../../constants.js';

import SimpleSeasonPicker from '../SimpleSeasonPicker.jsx';
import MemberWorkinghours from './MemberWorkinghours.jsx';

export default class MemberWorkinghoursContainer extends Component {
	
	static propTypes = {
		memberId: PropTypes.string.isRequired
	};

	constructor(props) {
		super(props);
		this.state={
			loading: false,
			modalOpen: false,
			unauthorizedSnackbarOpen: false,
			activeSeason: 0,
			neededHours: 0,
			seasons: [],
			selectedSeason: 0,
			workedHours: 0,
			currentWorkinghours: []
		};
	}

	componentDidMount(){
		this.loadData(this.state.selectedSeason);
	}

	loadData = (selectedSeason) => {  
		if (!this.state.loading) {
			this.setState({
				loading: true,
			});

			getAuthorized(API.member + '/' + this.props.memberId + '/season/' + selectedSeason, 
				(response) => {
					this.setState({
						loading: false,
					});
					const body = response.body;

					this.setState({
						neededHours: Math.ceil(body.neededMinutes/30)/2,
						workedHours: Math.ceil(body.workedMinutes/30)/2,
						currentWorkinghours: body.workinghours,
						activeSeason: body.activeSeason,
						selectedSeason: body.selectedSeason,
						seasons: body.seasons
					});



				}, 
				(response) => {
					this.setState({
						loading: false,
					});
					if (response.status === 401) {
						this.setState({
							unauthorizedSnackbarOpen: true,
						});	
					} else {
						this.setState({
							modalOpen: true,
						});
						console.error("Server replied: " + response);
					}
				}
			);
		}
	}

	handleSnackbarClose = () => {
		this.setState({
			unauthorizedSnackbarOpen: false,
		});
	}

	handleModalClose = () => {
		this.setState({
			modalOpen: false,
		});
	}

	handleSeasonChanged = (newSelectedSeason) => {
		this.loadData(newSelectedSeason);
		this.setState({
			selectedSeason: newSelectedSeason
		});
	}

	MemberWorkinghoursWidgetContainerComponent = withWidget(MemberWorkinghours);

	render() {
		const { loading, modalOpen, unauthorizedSnackbarOpen, activeSeason, neededHours, seasons, selectedSeason, workedHours, currentWorkinghours } = this.state;

		const MemberWorkinghoursWidget = this.MemberWorkinghoursWidgetContainerComponent;

		const titleComponent = <div style={{flex: '1'}}><Typography variant='title' color="inherit" style={{float: 'left', marginTop: 15}}>Arbeitsstunden {workedHours} von {neededHours}</Typography><Typography variant='title' color='inherit' style={{float: 'right'}}><span style={{float: 'left', marginTop: 15}}>Saison:&nbsp;</span><span style={{float: 'left'}}><SimpleSeasonPicker seasons={seasons} selected={selectedSeason} current={activeSeason} onChange={this.handleSeasonChanged}  /></span></Typography></div>;

		return (
			<MemberWorkinghoursWidget 
				titleComponent={titleComponent}
				loading={loading}
				modalOpen={ modalOpen } 
				snackbarOpen={ unauthorizedSnackbarOpen }
				onSnackbarClose={this.handleSnackbarClose} 
				modalTitle={"Fehler bei der Kommunikation mit dem Server"}
				modalText={"Sollte das Problem anhalten melde dich bitte beim Takelmeister!"}
				onModalClose={this.handleModalClose} 
				workinghours={currentWorkinghours}
			/>
		);
	}
}
