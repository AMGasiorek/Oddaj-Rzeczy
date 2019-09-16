import React from 'react';
import {Link } from 'react-scroll';
import * as ROUTES from '../../constants/routes';


const Navigation = () => (
    <nav>
        <ul className="menu">
            <li className="menu--element">
                <Link to={ROUTES.HOME} className="NavLink" activeClassName="NavLinkActive">Start</Link>
            </li>
            <li className="menu--element">
                <Link to={ROUTES.HOME} className="NavLink" activeClassName="NavLinkActive">O co chodzi?</Link>
            </li>
            <li className="menu--element">
                <Link to={ROUTES.HOME} className="NavLink" activeClassName="NavLinkActive">O nas</Link>
            </li>
            <li className="menu--element">
                <Link to={ROUTES.HOME} className="NavLink" activeClassName="NavLinkActive">Fundacja i organizacje</Link>
            </li>
            <li className="menu--element">
                <Link to={ROUTES.HOME} className="NavLink" activeClassName="NavLinkActive">Kontakt</Link>
            </li>
        </ul>
    </nav>
);


export default Navigation;