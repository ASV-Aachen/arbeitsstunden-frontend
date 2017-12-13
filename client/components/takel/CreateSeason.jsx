import React from 'react';
import request from 'superagent';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

import { Config } from '../../../config.js';

import { LinearProgress } from 'material-ui/Progress';

export default class CreateSeason extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			nextSeason: -1,
			obligatoryHours: 50,
		};
	};

	componentWillMount() {
        this.loadNextSeason();
    };
	
	loadNextSeason = () => {
		this.setState({loading: true});

		const endpoint = Config.baseurl + Config.endpoints.seasonNext;

        request.get(endpoint)
            .set('Content-Type', 'application/json')
            .then(success => {
				const body = success.body;

				this.setState({
					loading: false,
					nextSeason: body.nextSeason,
				});
            }, failure => {
				this.setState({
					loading: false,
				});
                console.error("Error: getting next seasons (Response: ", failure.status, ")", failure);
            });
     }

	createSeason = (newSeason) => {
		if (this.state.loading) {
			return;	
		}

		this.setState({loading: true});
		const endpoint = Config.baseurl + Config.endpoints.seasons;

		request.post(endpoint)
			.send(newSeason)
			.set('Content-Type', 'application/json')
			.then(success => {
				const body = success.body;

				//TODO bestaetigung

				this.setState({
					loading: false,
					nextSeason: body.year + 1
				});
			}, failure => {
				this.setState({
					loading: false,
				});
				console.error("Error: creating next seasons (Response: ", failure.status, ")", failure);
			});
	}

	handleClick = () => {
		const { nextSeason, obligatoryHours } = this.state;
		let seasonData = { 
			year: nextSeason,
			obligatoryMinutes: obligatoryHours * 60,
		};

		this.createSeason(seasonData);
	}

	render() {
		const { loading, nextSeason } = this.state;
		return (
			<Paper>
				<AppBar position='static'>
					<Toolbar>
						<Typography type="title" color="inherit" style={{flex:'1'}}>
							<span>Arbeitsstundensaison Starten</span>
						</Typography>
					</Toolbar>
					{ loading && <LinearProgress /> }
				</AppBar>
				<div style={{padding:15}}>
					<Typography paragraph>
						Arbeitsstundensaison <b>{ nextSeason -1 }/{ nextSeason }</b>
					</Typography>

					<TextField
						id='obligatoryHours'
						fullWidth
						label={'Pflichtarbeitsstunden'}
						type='number'
						defaultValue='50'
						onChange={(event)=>{this.setState({obligatoryHours: event.target.value,})}}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<br /><br />	
					<Button raised onClick={this.handleClick} >
						Anlegen
					</Button>
				</div>
			</Paper>
		);
	}
}
