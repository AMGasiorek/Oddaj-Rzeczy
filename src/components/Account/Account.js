import React from 'react';
import { compose } from 'recompose';
import { PasswordForgetForm } from '../PasswordForget/PassworgForget';
import PasswordChangeForm from '../PasswordChange/PasswordChange';
import {
    AuthUserContext,
    withAuthorization,
    withEmailVerification,
} from '../Session/Session';
import LoginManagement from "../LoginManagement/LoginManagement";


const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div className="row">
                <div className="col-6">
                    <h1>Konto: {authUser.username}</h1>
                    <span>e-mail: {authUser.email}</span>
                    <LoginManagement authUser={authUser} />
                </div>
                <div className="col-6">
                    <div className="signForms--container">
                        <PasswordForgetForm />
                    </div>
                    <div className="signForms--container">
                        <PasswordChangeForm />
                    </div>
                </div>
            </div>
        )}
    </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(AccountPage);