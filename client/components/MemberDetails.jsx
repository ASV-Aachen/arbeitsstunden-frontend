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
		};
	};

	componentWillMount() {
        this.loadMemberDetails();
    };

	loadMemberDetails = () => {
		const endpoint = Config.baseurl + Config.endpoints.memberDetails;

        request.get(endpoint)
            .set('Content-Type', 'application/json')
            .then(success => {
				const body = success.body;

				console.log(body);

				this.setState({
					firstName: body.firstName,
					lastName: body.lastName,
					email: body.email,
					seasonReduction: body.seasonReduction,
				});
            }, failure => {
                console.error("Error: getting graph overview (Response: ", failure.status, ")", failure);
            });
     }


	render() {
		const { firstName, lastName, email, seasonReduction } = this.state;
		return (
			<Paper style={{height:300}}> 
				<AppBar position='static'>
					<Toolbar>
						<Typography type="title" color="inherit" style={{flex:'1'}}>
							<span>Daten</span>
						</Typography>
					</Toolbar>
				</AppBar>
				<div style={{padding:15, backgroundColor:'red'}}>
					{ firstName } { lastName }<br /><br />
					{ email }
					{ seasonReduction }
				</div>
			</Paper>
		);
	}
}
