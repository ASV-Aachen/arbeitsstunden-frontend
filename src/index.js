import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import Keycloak from 'keycloak-js'
import Cookies from 'universal-cookie';
// import LoginContainer from './components/login/LoginContainer';

import API from './constants.js';
import { postUnauthorized } from './components/HOC';

//keycloak init options
let initOptions = {
    url:            process.env.REACT_APP_KEYCLOAK_URL, 
    realm:          process.env.REACT_APP_KEYCLOAK_REALM, 
    clientId:       process.env.REACT_APP_KEYCLOAK_CLIENTID, 
    onLoad:         'login-required'
}


let keycloak = Keycloak(initOptions);

keycloak.redirectUri = process.env.REACT_APP_KEYCLOAK_REDIRECT_URL

keycloak.init({ onLoad: initOptions.onLoad })
    .then((auth) => {
        if (!auth) {
            window.location.reload();
        } else {
            console.info("Authenticated");
        }

        //React Render
        ReactDOM.render(<App />, document.getElementById('root'));
        registerServiceWorker();
    }).then(() => {
        const cookies = new Cookies();
        cookies.set('token', keycloak.token, { path: '/' });
        cookies.set('username', keycloak.tokenParsed.email, { path: '/' });

        if (keycloak.tokenParsed.realm_access.roles.includes('Takelmeister')){
            cookies.set('role', "ROLE_TAKEL", { path: '/' });
        } else {
            cookies.set('role', "ROLE_USER", { path: '/' });
        }
    })
.catch(() => {
    console.error("Authenticated Failed");
});
console.info(keycloak)
        
// LoginContainer.handleLoginUser(keycloak.tokenParsed.email, 'asv')
postUnauthorized(API.login, 
    (response) => {
        const cookies = new Cookies();
        cookies.set('ArbeitsstundenDB_Token', response.body.token, { path: '/' });
        cookies.set('role', response.body.role, { path: '/' });
        cookies.set('memberId', response.body.memberId, { path: '/' });
        cookies.set('username', username, { path: '/' });
        cookies.set('password', password, { path: '/' });
    }, 
    (response) => {
        if (response.status === 401) {
            this.setState({
                unauthorizedSnackbarOpen: true,
            });	
        } else {
            console.error("Server replied: " + response);
        }
    }, 
    keycloak.tokenParsed.email,
    'asv'
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

export default keycloak;