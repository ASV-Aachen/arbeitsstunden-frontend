import React from 'react';
import request from 'superagent';
import Cookies from 'universal-cookie';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import { Config } from '../../../config.js';
import MembersTable from './MembersTable.jsx'

export default class MembersList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			memberList : [],
		};

	};
	
	componentWillMount() {
		this.loadMembersList();
    };

	loadMembersList = () => {
		const { season } = this.props;
		const endpoint = Config.baseurl + Config.endpoints.membersList + "/" + season;
		const cookies = new Cookies();
		let user = cookies.get('username');
		let pass = cookies.get('password');

        request.get(endpoint)
			.auth(user, pass)
            .set('Content-Type', 'application/json')
            .then(success => {
				const body = success.body;

				this.setState({
					memberList: body,
				});

            }, failure => {
                console.error("Error: getting member details (Response: ", failure.status, ")", failure);
            });
     }


	render() {
		const { season } = this.props;
		const { memberList } = this.state;

		return (
			<Paper>
				<AppBar position='static'>
					<Toolbar>
						<Typography type="title" color="inherit" style={{flex:'1'}}>
							<span>Mitglieder mit Arbeitstunden</span>
						</Typography>
					</Toolbar>
				</AppBar>
				<MembersTable data={ memberList }/>
			</Paper>
		);
	}
}
