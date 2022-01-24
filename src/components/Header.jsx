import React from 'react';

import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';

export default class Header extends React.Component {

	render() {
		const { isTakel, logout } = this.props;
		return (
			<AppBar position='static'>
				<Toolbar>
					{this.props.children}	
					<Link to="/member" style={{textDecoration:'none'}}>
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
					{isTakel && 
						<Link to="/takel/hours" style={{textDecoration:'none'}}>
							<Button>
								Takel	
							</Button>
						</Link>
					}
					<a href={process.env.REACT_APP_HOME_ADRESS}>
						<Button variant="raised">
							Home
						</Button>
					</a>
				</Toolbar>
			</AppBar>
		);
	}
}
