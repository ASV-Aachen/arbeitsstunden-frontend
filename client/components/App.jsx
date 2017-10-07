import React from 'react';

import ProjectPage from './ProjectPage.jsx'
import CreateWorkingHourPage from './CreateWorkingHourPage.jsx'
import CreateUserPage from './CreateUserPage.jsx'
import UserListPage from './UserListPage.jsx'

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid'
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'
import { grey, amber, red} from 'material-ui/colors';

const muiTheme = createMuiTheme();

const styles = theme => ({
	'@global': {
		html: {
			background: theme.palette.background.default,
			WebkitFontSmoothing: 'antialiased', // Antialiasing.
			MozOsxFontSmoothing: 'grayscale', // Antialiasing.
		},
		body: {
			margin: 10,
		},
	},
});


let AppWrapper = props => props.children;
AppWrapper = withStyles(styles)(AppWrapper);

export default class App extends React.Component {
	render() {
		return (
			<MuiThemeProvider theme={muiTheme}>
				<AppWrapper>
					 <Grid container spacing={24}>
					    <Grid item xs={12} sm={6}>
							<ProjectPage />
						</Grid>
						<Grid item xs={12} sm={6}>
							<CreateWorkingHourPage />
						</Grid>
						<Grid item xs={12} sm={12}>
							<UserListPage />
						</Grid>
					  </Grid>
				</AppWrapper>
			</MuiThemeProvider>
		);
	}
}
