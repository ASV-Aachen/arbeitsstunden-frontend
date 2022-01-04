import React from 'react';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';
  
import Typography from '@material-ui/core/Typography';

import AuthRoute from './AuthRoute.jsx'
import Header from './Header.jsx'
import SimpleSeasonPicker from './SimpleSeasonPicker.jsx';

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

export const withTitleAndSeasonPicker = (title) =>
	class extends React.Component {
		static propTypes = {
			seasons: PropTypes.object.isRequired,
			selectedSeason: PropTypes.number.isRequired,
			seasonChanged: PropTypes.func.isRequired,
		};

		render() {
			const { seasons, selectedSeason, seasonChanged } = this.props;

			return (
				<div style={{display:'flex', flex:'1'}}>
					<Typography variant='display1'>
						{title}	
					</Typography>
					<div style={{display:'flex', flexDirection:'row', alignItems: 'baseline',  marginLeft:'10px'}}>
						<Typography variant="title" style={{float:'left'}}>
							<span>Saison&nbsp;</span>
						</Typography>
						<SimpleSeasonPicker seasons={seasons.seasons} selected={selectedSeason} current={seasons.currentSeason} onChange={seasonChanged} />
					</div>
				</div>
			);
		}
	};



class ProjectHeader extends React.Component {
	render(){
		const { projectName } = this.props.match.params;
		return (
			<div style={{display:'flex', flex:'1'}}>
				<Typography variant='display1' style={{flex:'1'}}>
					{projectName}
				</Typography>
			</div>
		);
	}
}

export default class HeaderContainer extends React.Component {
	static propTypes = {
		seasons: PropTypes.object.isRequired,
		selectedSeason: PropTypes.number, 
		seasonChanged: PropTypes.func,
	};

	isTakel = () => {
		const cookies = new Cookies();
		let role = cookies.get('role');
		return role === "ROLE_TAKEL";
	}

	logout = () => {
		const cookies = new Cookies();
		cookies.remove('token', { path: '/' });
		cookies.remove('role', { path: '/' });
		cookies.remove('username', { path: '/' });
		cookies.remove('password', { path: '/' });
		cookies.remove('memberId', { path: '/' });

		window.location.reload();
	}

	render() {
		const { seasons, selectedSeason, seasonChanged } = this.props;

		const MemberHeader = withTitle("Meine Arbeitsstunden");
		const MembersHeader = withTitleAndSeasonPicker("Mitglieder");
		const TakelHeader = withTitle("Takel");
		const ProjectsHeader = withTitleAndSeasonPicker("Projekte");

		return (
			<Header isTakel={this.isTakel()} logout={this.logout}>
				<AuthRoute exact path="/arbeitsstunden/member/:memberId?" component={MemberHeader} />
				<AuthRoute exact path="/arbeitsstunden/members/:season?" render={
					(props) => { 
						return (<MembersHeader seasons={seasons} selectedSeason={selectedSeason} seasonChanged={seasonChanged('members')} {...props} />);
					}} />
				<AuthRoute exact path="/arbeitsstunden/projects/:season?" render={
					(props) => {
						return(<ProjectsHeader seasons={seasons} selectedSeason={selectedSeason} seasonChanged={seasonChanged('projects')} {...props} />);
					}} />
				<AuthRoute exact path="/arbeitsstunden/project/:projectName/:season/:projectId" component={ProjectHeader}/>
				<AuthRoute path="/takel" component={TakelHeader} />
			</Header>
		);
	}
}
