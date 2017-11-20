import React from 'react';

import LoginScreen from './LoginScreen.jsx'
import HomeScreen from './HomeScreen.jsx'
import AuthRoute from './AuthRoute.jsx'

import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper';
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'
import { grey, amber } from 'material-ui/colors';
import { Switch } from 'react-router-dom'

const muiTheme = createMuiTheme();

const theme = createMuiTheme({
	'@global': {
		body: {
			backgroundColor: grey[100],
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
		primary: amber,
		secondary: grey,
	}
});

//$primary-color-dark:   #616161 grey[700]
//$primary-color:        #9E9E9E grey[500]
//$primary-color-light:  #F5F5F5 grey[100]
//$primary-color-text:   #212121 grey[900]
//$accent-color:         #FFC107 amber[500]
//$primary-text-color:   #212121 grey[900]
//$secondary-text-color: #757575 grey[600]
//$divider-color:        #BDBDBD grey[400]

let AppWrapper = props => props.children;
AppWrapper = withStyles(theme)(AppWrapper);

export default class App extends React.Component {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<AppWrapper>
					<div>
						<Switch>
							<AuthRoute exact path="/login" component={ LoginScreen } />
							<AuthRoute path="/" component={ HomeScreen } />
						</Switch>
					</div>
				</AppWrapper>
			</MuiThemeProvider>
		);
	}
}
