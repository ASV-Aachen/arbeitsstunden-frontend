import React from 'react';

import ProjectPage from './ProjectPage.jsx'

import Button from 'material-ui/Button';
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
					<ProjectPage />
				</AppWrapper>
         		 </MuiThemeProvider>
		);
	}
}
