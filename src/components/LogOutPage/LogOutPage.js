import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import TopMenu from "../TopMenu/TopMenu";
import Decoration from "../../assets/Decoration.svg";

const LogOutPage = () => (
    <>
        <div className="topMenuContainer">
            <div className="topMenuContainer--leftMargin"></div>
            <TopMenu/>
            <div className="topMenuContainer--rightMargin"></div>
        </div>
        <LogOutGoodBye/>
    </>
);

const LogOutGoodBye = () => (
    <div className="logOutGoodBye">
        <p className="logOutGoodBye--title">Wylogowanie nastąpiło pomyślnie</p>
        <img src={Decoration} alt="decoration"/>
        <Link to={ROUTES.HOME} className="mediumButton">Strona główna</Link>
    </div>
);


export default LogOutPage;