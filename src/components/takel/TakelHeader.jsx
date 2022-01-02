import React from 'react';
  
import Typography from '@material-ui/core/Typography';

import AuthRoute from '../AuthRoute.jsx'

export const withTitle = (title) =>
	class extends React.Component {
		render() {
			return (
				<Typography variant='display1' style={{flex:'1'}}>
					{title}	
				</Typography>
			);
		}
	};

export default class TakelHeader extends React.Component {
	static propTypes = {
	};

	render() {
		const SaisonsHeader = withTitle("Saisonverwaltung");
		const WorkinghoursHeader = withTitle("Arbeitsstunden");
		const DashboardHeader = withTitle("Dashboard");
		const UsersHeader = withTitle("Benutzerverwaltung");

		return (
			<div>
				<AuthRoute exact path="/arbeitsstunden/takel/dashboard" component={DashboardHeader} />
				<AuthRoute exact path="/arbeitsstunden/takel/seasons" component={SaisonsHeader} />
				<AuthRoute exact path="/arbeitsstunden/takel/hours" component={WorkinghoursHeader} />
				<AuthRoute exact path="/arbeitsstunden/takel/users" component={UsersHeader} />
			</div>
		);
	}
}
