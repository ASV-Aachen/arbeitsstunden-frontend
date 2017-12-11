import React from 'react';
import request from 'superagent';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import { Config } from '../../../config.js';

import { LinearProgress } from 'material-ui/Progress';

export default class CreateSeason extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
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

				console.log(body);

				this.setState({
					loading: false,
				});
            }, failure => {
				this.setState({
					loading: false,
				});
                console.error("Error: getting next seasons (Response: ", failure.status, ")", failure);
            });
     }

	render() {
		const { loading } = this.state;
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
					TODO: Fill me oO
				</div>
			</Paper>
		);
	}
}
