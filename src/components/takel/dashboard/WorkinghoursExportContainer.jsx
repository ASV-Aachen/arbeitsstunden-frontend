import React, { Component } from 'react';

import { withWidget, getAuthorized, Title } from '../../HOC'; 
import API from '../../../constants.js';

import WorkinghoursExport from './WorkinghoursExport.jsx'

export default class WorkinghoursExportContainer extends Component {
	static propTypes = {
    	};

    	constructor(props) {
    		super(props);
    		this.state={
    			loading: false,
    			modalOpen: false,
    			unauthorizedSnackbarOpen: false,
    			activeSeason: 0,
    			seasons: [],
    		}
    	}

    	TitleComponent = Title("Arbeitsstunden exportieren");
    	WorkinghoursExportWidgetComponent = withWidget(WorkinghoursExport);

    	componentDidMount(){
    		this.loadSeasons();
    	}


    	loadSeasons = () => {
    		if (!this.state.loading) {
    			this.setState({
    				loading: true,
    			});

    			getAuthorized(API.seasons,
    				(response) => {
    					this.setState({
    						loading: false,
    					});
    					const body = response.body;

    					this.setState({
    						activeSeason: body.activeSeason,
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

    	downloadWorkinghours = (season) => {
            		if (!this.state.loading) {
            			this.setState({
            				loading: true,
            			});

            			getAuthorized(API.seasons + '/' + season + '/export',
            				(response) => {
            					this.setState({
            						loading: false,
            					});
            					const body = response.text;
            					let csvContent = "data:text/csv;charset=utf-8," + body
                                var encodedUri = encodeURI(csvContent);

                                var link = document.createElement("a");
                                link.setAttribute("href", encodedUri);
                                link.setAttribute("download", "arbeitsstunden-" + season + ".csv");
                                link.click();
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

    	handleDownload = (season) => {
    		this.downloadWorkinghours(season)
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

    	render() {
    		const { loading, modalOpen, unauthorizedSnackbarOpen, seasons, activeSeason } = this.state;
    		const WorkinghoursExportWidget = this.WorkinghoursExportWidgetComponent;

    		return (
    			<WorkinghoursExportWidget
    				titleComponent={ this.TitleComponent }
    				loading = {loading}
    				modalOpen={ modalOpen }
    				snackbarOpen={ unauthorizedSnackbarOpen }
    				onSnackbarClose={this.handleSnackbarClose}
    				modalTitle={"Fehler bei der Kommunikation mit dem Server"}
    				modalText={"Sollte das Problem anhalten melde dich bitte beim Takelmeister!"}
    				onModalClose={this.handleModalClose}
    				activeSeason={activeSeason}
    				seasons={seasons}
    				onDownload={this.handleDownload}
    			/>
    		);
    	}
}
