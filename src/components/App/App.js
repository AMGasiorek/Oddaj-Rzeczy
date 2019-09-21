import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../Home/Home';
import SignUpPage from '../SignUp/SignUp';
import SignInPage from '../SignIn/SignIn';
import LogoutPage from "../LogOutPage/LogOutPage";
import PasswordForgetPage from '../PasswordForget/PassworgForget';
import AccountPage from '../Account/Account';
import AdminPage from '../Admin/Admin';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session/Session';



const App = () => (

    <Router>
        <Switch>
            <Route exact path={ROUTES.HOME} component={Home}/>
            <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
            <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
            <Route path={ROUTES.LOGOUT} component={LogoutPage}/>
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
            <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
            <Route path={ROUTES.ADMIN} component={AdminPage}/>
        </Switch>
    </Router>
);

export default withAuthentication(App);