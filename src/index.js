import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import Keycloak from 'keycloak-js'
import Cookies from 'universal-cookie';

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

}).catch(() => {
    console.error("Authenticated Failed");
});

const cookies = new Cookies();
cookies.set('token', keycloak.token, { path: '/' });
cookies.set('memberId', keycloak.tokenParsed.email, { path: '/' });
cookies.set('username', "username", { path: '/' });
cookies.set('password', "password", { path: '/' });

cookies.set('role', response.body.role, { path: '/' });

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

export default keycloak;