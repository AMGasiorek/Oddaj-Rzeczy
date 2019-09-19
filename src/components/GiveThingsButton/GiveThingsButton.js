import React from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import {AuthUserContext} from '../Session/Session';



const GiveThingsButton = () => (
    <div className="bigButton">
        <AuthUserContext.Consumer>
            {authUser => authUser ? <GiveThingsButtonAuth authUser={authUser}/> : <GiveThingsButtonNonAuth />}
        </AuthUserContext.Consumer>
    </div>
);

const GiveThingsButtonAuth = ({ authUser }) => (
    <Link to={ROUTES.GIVE_AWAY_FORM} >Oddaj Rzeczy</Link>
);

const GiveThingsButtonNonAuth = () => (
    <Link to={ROUTES.SIGN_IN} >Oddaj Rzeczy</Link>
);

export default GiveThingsButton;