import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import Keycloak from 'keycloak-js'
import Cookies from 'universal-cookie';
import LoginContainer from './components/login/LoginContainer';

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
        
LoginContainer.handleLoginUser(keycloak.tokenParsed.email, 'asv')

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

export default keycloak;