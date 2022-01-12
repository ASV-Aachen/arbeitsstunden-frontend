import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import grey from '@material-ui/core/colors/grey';

import { Switch, HashRouter } from 'react-router-dom'

import AuthRoute from './AuthRoute' 
import LoginScreen from './login/LoginScreen' 
import MainScreen from './MainScreen' 

const theme = createMuiTheme({
	palette: {
		type: 'light',
		primary: amber,
		secondary: grey,
	}
});

export default class App extends Component {
  render() {
    return (
		<MuiThemeProvider theme={theme}>
			<HashRouter>
				<Switch>
					<AuthRoute path="/" component={ MainScreen } />
				</Switch>
			</HashRouter>
		</MuiThemeProvider>
    );
  }
}
