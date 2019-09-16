import React from 'react';
import {NavLink } from 'react-router-dom';
import SignOutButton from '../SignOut/SignOut';
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
    <ul className="menu">
        <li className="menu--element">
            <NavLink to={ROUTES.ACCOUNT} className="NavLink" activeClassName="NavLinkActive">Profil</NavLink>
        </li>
        <li className="menu--element">
            <NavLink to={ROUTES.GIVE_AWAY} className="NavLink" activeClassName="NavLinkActive">Oddaj rzeczy</NavLink>
        </li>
        {!!authUser.roles[ROLES.ADMIN] && (
            <li className="menu--element">
                <NavLink to={ROUTES.ADMIN} className="NavLink" activeClassName="NavLinkActive">admin</NavLink>
            </li>
        )}
        <li className="menu--element">
            <SignOutButton />
        </li>
    </ul>
);

const LoginRegisterNonAuth = () => (
    <ul className="menu">
        <li className="menu--element">
            <NavLink to={ROUTES.SIGN_IN} className="NavLink" activeClassName="NavLinkActive">Zaloguj</NavLink>
        </li>
        <li className="menu--element">
            <NavLink to={ROUTES.SIGN_UP} className="NavLink" activeClassName="NavLinkActive">Załóż konto</NavLink>
        </li>
    </ul>
);


export default LoginRegister;