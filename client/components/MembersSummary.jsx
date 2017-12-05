import React from 'react';
import request from 'superagent';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import { Config } from '../../config.js';

export default class MembersSummary extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			workedMinutesTotal: "",
			numMembersSailingAllowed: "",
			numMembersSailingNotAllowed: "",
			kingFirstName: "",
			kingLastName: "",
			kingMinutes: "",
		}
	};

	componentWillMount() {
        this.loadMembersSummary();
    };

	loadMembersSummary = () => {
		const endpoint = Config.baseurl + Config.endpoints.membersSummary + "/2017";

        request.get(endpoint)
            .set('Content-Type', 'application/json')
            .then(success => {
				const body = success.body;

				this.setState({
					workedMinutesTotal: body.workedMinutesTotal,
					numMembersSailingAllowed: body.numMembersSailingAllowed,
					numMembersSailingNotAllowed: body.numMembersSailingNotAllowed,
					kingFirstName: body.kingMember.firstName,
					kingLastName: body.kingMember.lastName,
					kingMinutes: body.kingMinutes,
				});
            }, failure => {
                console.error("Error: getting graph overview (Response: ", failure.status, ")", failure);
            });
     }

	render() {
		const { workedMinutesTotal,  numMembersSailingAllowed, numMembersSailingNotAllowed, kingFirstName, kingLastName, kingMinutes } = this.state;

		return (
			<Paper>
				<AppBar position='static'>
					<Toolbar>
						<Typography type="title" color="inherit" style={{flex:'1'}}>
							<span>Zusammenfassung</span>
						</Typography>
					</Toolbar>
				</AppBar>
				<div style={{padding:15}}>
					Gesamt geleistete Arbeitstunden: {Math.ceil(workedMinutesTotal/30)/2} <br /><br />
					#wie viele duerfen segeln: {numMembersSailingAllowed} <br /><br />
					#wie viele haben segelverbot: {numMembersSailingNotAllowed}<br /><br />
					Arbeitstundenkoenig: {kingFirstName} {kingLastName}  {Math.ceil(kingMinutes/30)/2}  <br /><br />

				</div>
			</Paper>
		);
	}
}
