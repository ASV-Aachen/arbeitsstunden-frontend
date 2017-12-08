import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

import AuthRoute from './AuthRoute.jsx';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import SimpleSeasonPicker from './picker/SimpleSeasonPicker.jsx';

class MemberHeader extends React.Component {
	render(){
		return (
			<Typography type='display1' style={{flex:'1'}}>
				Meine Arbeitsstunden
			</Typography>
		);
	}
}
class MembersHeader extends React.Component {
	render(){
		return (
			<Typography type='display1' style={{flex:'1'}}>
				Mitglieder
			</Typography>
		);
	}
}
class ProjectHeader extends React.Component {
	render(){
		const { projectName } = this.props.match.params;
		return (
			<Typography type='display1' style={{flex:'1'}}>
				{projectName}
			</Typography>
		);
	}
}
class ProjectsHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedSeason: -1,
		};
	};

	seasonSelected = (selectedSeason) => {
		this.setState({
			selectedSeason: selectedSeason,
		});
	}

	render() {
		const { selectedSeason } = this.state; //TODO get active Season from url!
		const { availableSeasons } = this.props;
		const { seasons, activeSeason } = availableSeasons;
		return (
			<div style={{display:'flex', flex:'1'}}>
				<Typography type='display1'>
					Projekte
				</Typography>
				<div style={{flex:'1', margin: 'auto', marginLeft:'10px'}}>
					<Typography type="title" style={{float:'left'}}>
						<span>Saison&nbsp;</span>
					</Typography>
			{ availableSeasons.seasons && <SimpleSeasonPicker seasons={seasons} selected={selectedSeason} current={activeSeason} onChange={this.seasonSelected} /> }
				</div>
			</div>
		)
	}
}

export default class Header extends React.Component {
	logout = () => {
		const cookies = new Cookies();
		cookies.remove('token');
		location.reload();
	}

	render() {
		const { availableSeasons } = this.props;

		return (
				<AppBar position='static'>
					<Toolbar>
							<AuthRoute exact path="/" component={MemberHeader} />
							<AuthRoute exact path="/members" component={MembersHeader} />
							<AuthRoute exact path="/projects" children={()=><ProjectsHeader availableSeasons={availableSeasons} />} />
							<AuthRoute exact path="/project/:projectName/:season/:projectId" component={ProjectHeader}/>


						<Link to="/" style={{textDecoration:'none'}}>
							<Button>
								Meine Stunden
							</Button>
						</Link>
						<Link to="/projects" style={{textDecoration:'none'}}>
							<Button>
								Projekte	
							</Button>
						</Link>
						<Link to="/members" style={{textDecoration:'none'}}>
							<Button>
								Mitglieder	
							</Button>
						</Link>
						<Link to="/takel" style={{textDecoration:'none'}}>
							<Button>
								Takel	
							</Button>
						</Link>
						<Button raised onClick={this.logout}>
							Logout
						</Button>
					</Toolbar>
				</AppBar>
		);
	}
}
