import React from 'react';
import {NavLink } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { AuthUserContext } from '../Session/Session';



const LoginRegister = () => (
    <div className="loginRegister">
        <AuthUserContext.Consumer>
            {authUser => authUser ? <LoginRegisterAuth authUser={authUser}/> : <LoginRegisterNonAuth />}
        </AuthUserContext.Consumer>
    </div>
);

const LoginRegisterAuth = ({ authUser }) => (
    <ul>
        <li>
            <NavLink to={ROUTES.ACCOUNT} className="navLink" activeClassName="logLinkActive">Profil</NavLink>
        </li>
        <li>
            <NavLink to={ROUTES.GIVE_AWAY_FORM} className="navLink" activeClassName="logLinkActive">Oddaj Rzeczy</NavLink>
        </li>
        {!!authUser.roles[ROLES.ADMIN] && (
            <li>
                <NavLink to={ROUTES.ADMIN} className="navLink" activeClassName="logLinkActive">Admin</NavLink>
            </li>
        )}
        <li>
            <NavLink to={ROUTES.LOGOUT} className="navLink" activeClassName="logLinkActive"><LogOutButton/></NavLink>
        </li>
    </ul>
);

const LoginRegisterNonAuth = () => (
    <ul>
        <li>
            <NavLink to={ROUTES.SIGN_IN} className="navLink" activeClassName="logLinkActive">Zaloguj</NavLink>
        </li>
        <li>
            <NavLink to={ROUTES.SIGN_UP} className="navLink" activeClassName="logLinkActive">Załóż konto</NavLink>
        </li>
    </ul>
);


export default LoginRegister;