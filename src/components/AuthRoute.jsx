import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';
import LoginScreen from './login/LoginScreen.jsx'

const isAuthenticated = () => {
	return true;
};

const PRIVATE_ROOT = '/member';
const PUBLIC_ROOT = '/login';


export default class AuthRoute extends React.Component {
	static propTypes = {
		component: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.func
		])
	};

	render() {
		const { component, ...props } = this.props;

		return <Route { ...props } component={ component } />;
	}
}
