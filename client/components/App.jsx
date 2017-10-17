import React from 'react';

import LoginScreen from './LoginScreen.jsx'
import Main from './Main.jsx'
import AuthRoute from './AuthRoute.jsx'

import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper';
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'
import { purple, green, grey, amber, red} from 'material-ui/colors';
import { Switch } from 'react-router-dom'

const muiTheme = createMuiTheme();

const theme = createMuiTheme({
	'@global': {
		body: {
			backgroundColor: '#a5a3a4',
			margin: 0,
			padding: 0,
			height: '100%',
			minHeight: '100%',
			position: 'relative',
			overflowY: 'auto',
			overflowX: 'hidden',
		},
		html: {
			margin: 0,
			padding: 0,
			height: '100%',
			minHeight: '100%',
			position: 'relative',
			overflowY: 'auto',	
		}
	},
	palette: {
		type: 'light',
		primary: purple,
		secondary: green,
	}
});

let AppWrapper = props => props.children;
AppWrapper = withStyles(theme)(AppWrapper);

export default class App extends React.Component {


	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<AppWrapper>
					<div>
						<Switch>
							<AuthRoute exact path="/" component={ Main } />
							<AuthRoute exact path="/login" component={ LoginScreen } />
						</Switch>
					</div>
				</AppWrapper>
			</MuiThemeProvider>
		);
	}
}
