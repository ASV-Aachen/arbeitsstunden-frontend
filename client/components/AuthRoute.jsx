import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

//Mock of an Auth method, can be replaced with an async call to the backend. Must return true or false
const isAuthenticated = () => false;

const PRIVATE_ROOT = '/';
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

		if (isAuthenticated()) {
			//If the route is private the user may proceed.
			return <Route { ...props } component={ component } />;
		}
		else {
			const { isPublic } = component;		
			if (isPublic === true) {
				return <Route { ...props } component={ component } />;
			} else {
				//If the route is private the user is redirected to the app's public root.
				return <Redirect to={ PUBLIC_ROOT } />;
			}
		}
	}
}
