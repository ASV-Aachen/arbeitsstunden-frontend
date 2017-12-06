import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';


import AuthRoute from './AuthRoute.jsx';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

class ProjectHeader extends React.Component {


	render(){
		const { projectName } = this.props.match.params;
		return (<span>{projectName}</span>)
	}

}

export default class Header extends React.Component {

	logout = () => {
		const cookies = new Cookies();
		cookies.remove('token');
		location.reload();
	}

	render() {
		return (
				<AppBar position='static'>
					<Toolbar>
						<Typography type='display1' style={{flex:'1'}}>
							<AuthRoute exact path="/" render={() => <span>Meine Arbeitsstunden</span> } />
							<AuthRoute exact path="/members" render={() => <span>Mitglieder</span> } />
							<AuthRoute exact path="/projects" render={() => <span>Projekte</span> } />
							<AuthRoute exact path="/project/:projectName/:season/:projectId" component={ProjectHeader}/>
						</Typography>


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
