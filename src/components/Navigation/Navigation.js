import React from 'react';
import {NavLink } from 'react-router-dom';
import SignOutButton from '../SignOut/SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { AuthUserContext } from '../Session/Session';



const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser => authUser ? <NavigationAuth authUser={authUser}/> : <NavigationNonAuth />}
        </AuthUserContext.Consumer>
    </div>
);

const NavigationAuth = ({ authUser }) => (
    <ul className="menu">
        <li className="menu--element">
            <NavLink to={ROUTES.HOME} className="NavLink" activeClassName="Active">home</NavLink>
        </li>
        <li className="menu--element">
            <NavLink to={ROUTES.ACCOUNT} className="NavLink" activeClassName="Active">profil</NavLink>
        </li>
        {!!authUser.roles[ROLES.ADMIN] && (
            <li className="menu--element">
                <NavLink to={ROUTES.ADMIN} className="NavLink" activeClassName="Active">admin</NavLink>
            </li>
        )}
        <li className="menu--element">
            <SignOutButton />
        </li>
    </ul>
);

const NavigationNonAuth = () => (
    <ul className="menu">
        <li className="menu--element">
            <NavLink to={ROUTES.DEMO} className="NavLink" activeClassName="Active">demo</NavLink>
        </li>
        <li className="menu--element">
            <NavLink to={ROUTES.SIGN_IN} className="NavLink" activeClassName="Active">zaloguj</NavLink>
        </li>
    </ul>
);


export default Navigation;