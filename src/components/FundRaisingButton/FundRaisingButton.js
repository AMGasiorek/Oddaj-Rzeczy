import React from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import {AuthUserContext} from '../Session/Session';



const FundRaisingButton = () => (
    <div className="bigButton">
        <AuthUserContext.Consumer>
            {authUser => authUser ? <FundRaisingButtonAuth authUser={authUser}/> : <FundRaisingButtonNonAuth />}
        </AuthUserContext.Consumer>
    </div>
);

const FundRaisingButtonAuth = ({ authUser }) => (
    <Link to={ROUTES.FUND_RAISING} >Zorganizuj Zbiórkę</Link>
);

const FundRaisingButtonNonAuth = () => (
    <Link to={ROUTES.SIGN_IN} >Zorganizuj Zbiórkę</Link>
);

export default FundRaisingButton;