import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from '../Landing/Landing';
import SignUpPage from '../SignUp/SignUp';
import SignInPage from '../SignIn/SignIn';
import PasswordForgetPage from '../PasswordForget/PassworgForget';
import HomePage from '../Home/Home';
import AccountPage from '../Account/Account';
import AdminPage from '../Admin/Admin';
import Navigation from "../Navigation/Navigation";

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session/Session';


const App = () => (

    <Router>
        <header>
            <Navigation />
        </header>
        <div className="mainContainer">
            <Switch>
                <Route exact path={ROUTES.LANDING} component={LandingPage}/>
                <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
                <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
                <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
                <Route path={ROUTES.HOME} component={HomePage}/>
                <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
                <Route path={ROUTES.ADMIN} component={AdminPage}/>
            </Switch>
        </div>
    </Router>
);


export default withAuthentication(App);