import React from 'react';
import {NavLink} from "react-router-dom";
import {Link } from 'react-scroll';
import * as ROUTES from '../../constants/routes';


const Navigation = () => (
    <nav>
        <ul>
            <li>
                <NavLink to={ROUTES.HOME} className="navLink" activeClassName="navLinkActive">Start</NavLink>
            </li>
            <li>
                <Link to={ROUTES.HOME} className="navLink" >O co chodzi?</Link>
            </li>
            <li>
                <Link to={ROUTES.HOME} className="navLink" >O nas</Link>
            </li>
            <li>
                <Link to={ROUTES.HOME} className="navLink" >Fundacja i organizacje</Link>
            </li>
            <li>
                <Link to={ROUTES.HOME} className="navLink" >Kontakt</Link>
            </li>
        </ul>
    </nav>
);


export default Navigation;