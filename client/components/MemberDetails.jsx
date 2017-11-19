import React from 'react';
import request from 'superagent';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import { Config } from '../../config.js';

export default class MemberDetails extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			seasonReduction: [],
			intervals: [],
		};
	};

	componentWillMount() {
        this.loadMemberDetails();
    };

	createIntervals = (reductions) => {
		let intervals = [];
		let lastStatus = undefined;

		reductions.map((item) => {
			if(item.reduction == 0 && item.asvStatus == lastStatus) {
				intervals[intervals.length-1]['to'] = item.year;
			} else {
				lastStatus = item.asvStatus;
				if(item.reduction > 0) {
					lastStatus = undefined
				}
				intervals.push({
					status: item.asvStatus,
					from: item.year,
					to: undefined,
					reduction: item.reduction,
				});
			}
		});
		
		console.log(intervals);
		return intervals;
	}

	loadMemberDetails = () => {
		const endpoint = Config.baseurl + Config.endpoints.memberDetails;

        request.get(endpoint)
            .set('Content-Type', 'application/json')
            .then(success => {
				const body = success.body;

				let reductions = body.seasonReduction.sort((a, b) => a.year > b.year);
				
				let intervals = this.createIntervals(reductions);

				this.setState({
					firstName: body.firstName,
					lastName: body.lastName,
					email: body.email,
					seasonReduction: reductions,
					intervals: intervals,
				});
            }, failure => {
                console.error("Error: getting graph overview (Response: ", failure.status, ")", failure);
            });
     }

	toSeasonString = (year) => {
		return year-1 + "/" + year
	}

	toHumanReadable = (status) => {
		let map = {
			"PROSPECT":"Anwärter",
			"ACTIVE": "Aktiv",
			"INACTIVE": "Inaktiv",
		}
		if (map[status]) {
			return map[status];
		} else {
			return status;
		} 
	}

	render() {
		const { firstName, lastName, email, intervals } = this.state;
		return (
			<Paper style={{height:300}}> 
				<AppBar position='static'>
					<Toolbar>
						<Typography type="title" color="inherit" style={{flex:'1'}}>
							<span>Daten</span>
						</Typography>
					</Toolbar>
				</AppBar>
				<div style={{padding:15}}>
					{ firstName } { lastName }<br /><br />
					{ email }<br /><br />
					{ intervals.map((interval) => {
						if (interval.to == undefined) {
							let reduction = "";
							if (interval.reduction > 0) {
								reduction = "Reduktion: " + (interval.reduction/60);
							}
							return (<div key={interval.from}> {this.toSeasonString(interval.from)} {this.toHumanReadable(interval.status)} {reduction} </div>) 
						} else {
							return (<div key={interval.from}> {this.toSeasonString(interval.from)} - {this.toSeasonString(interval.to)} {this.toHumanReadable(interval.status)} </div>) 
						}

					}) }
				</div>
			</Paper>
		);
	}
}
