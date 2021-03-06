import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {Link} from 'react-scroll'
import * as ROUTES from '../../constants/routes';


class Navigation extends Component {

    handleSetActive(to) {
        // console.log(to);
    }

    render () {
        return (

            <nav>
                <ul>
                    <li>
                        <NavLink to={ROUTES.HOME} className="navLink" activeClassName="navLinkActive">Start</NavLink>
                    </li>
                    <li>
                        <Link className="navLink" activeClass="active" to="SimpleSteps" spy={true} smooth={true} offset={50} duration={500} onSetActive={this.handleSetActive}>O co chodzi?</Link>
                    </li>
                    <li>
                        <Link className="navLink" activeClass="active" to="aboutUs" spy={true} smooth={true} offset={50} duration={500} onSetActive={this.handleSetActive}>O nas</Link>
                    </li>
                    <li>
                        <Link className="navLink" activeClass="active" to="WhoWeHelp" spy={true} smooth={true} offset={50} duration={500} onSetActive={this.handleSetActive}>Fundacja i organizacje</Link>
                    </li>
                    <li>
                        <Link className="navLink" activeClass="active" to="Contact" spy={true} smooth={true} offset={50} duration={500} onSetActive={this.handleSetActive}>Kontakt</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}


export default Navigation;