import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp/SignUp';
import { PasswordForgetLink } from '../PasswordForget/PassworgForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import TopMenu from "../TopMenu/TopMenu";
import Decoration from "../../assets/Decoration.svg";

const SignInPage = () => (
    <>
        <div className="topMenuContainer">
            <div className="topMenuContainer--leftMargin"></div>
            <TopMenu/>
            <div className="topMenuContainer--rightMargin"></div>
        </div>
        <SignInForm />
    </>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    emailError: false,
    passwordLengthError: false,
    error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS =
    'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFormBase extends Component {

    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {

        event.preventDefault();

        const { email, password } = this.state;
        const emailFilter = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (emailFilter.test(email) === false) {
            this.setState({ emailError: true });
            return;
        } else {
            this.setState({ emailError: false });
        }

        if (password.length < 6) {
            this.setState({ passwordLengthError: true });
            return;
        } else {
            this.setState({ passwordLengthError: false });
        }

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;
        const isInvalid = password.length === '' || email === '';
        return (
            <div className="signForms--container">
                <p className="signForms--title">Zaloguj się</p>
                <img src={Decoration} alt="decoration"/>
                <form onSubmit={this.onSubmit} className="signForms">
                    <div className="signForms--inputField">
                        <p className="signForms--label">Email</p>
                        <input
                            name="email"
                            value={email}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Email Address"
                        />
                        {this.state.emailError === true ?
                            <div className="signForms--underline__error">
                                <p className="signForms--validation__error">Wpisz poprawny adres email</p>
                            </div> :
                            <div className="signForms--underline">
                                <p className="signForms--validation"> </p>
                            </div>
                        }
                        <p className="signForms--label">Hasło</p>
                        <input
                            name="password"
                            value={password}
                            onChange={this.onChange}
                            type="password"
                            placeholder="Password"
                        />
                        {this.state.passwordLengthError === true ?
                            <div className="signForms--underline__error">
                                <p className="signForms--validation__error">Podane hasło jest za krótkie</p>
                            </div> :
                            <div className="signForms--underline">
                                <p className="signForms--validation"> </p>
                            </div>
                        }
                        {error && <p className="signForms--validation__error">{error.message}</p>}
                        {/*<SignInGoogle />*/}
                        {/*<SignInFacebook />*/}
                        {/*<SignInTwitter />*/}
                        <PasswordForgetLink />

                    </div>
                    <div className="signForms--buttonsContainer">
                        <button disabled={isInvalid} type="submit" className="mediumButton">
                            Zaloguj się
                        </button>
                        <SignUpLink />
                    </div>
                </form>
            </div>
        );
    }
}

class SignInGoogleBase extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }
    onSubmit = event => {
        this.props.firebase
            .doSignInWithGoogle()
            .then(socialAuthUser => {
                // Create a user in your Firebase Realtime Database too
                return this.props.firebase
                    .user(socialAuthUser.user.uid)
                    .set({
                        username: socialAuthUser.user.displayName,
                        email: socialAuthUser.user.email,
                        roles: {},
                    });
            })
            .then(socialAuthUser => {
                this.setState({ error: null });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }
                this.setState({ error });
            });
        event.preventDefault();
    };
    render() {
        const { error } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <button type="submit">Sign In with Google</button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

class SignInFacebookBase extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }
    onSubmit = event => {
        this.props.firebase
            .doSignInWithFacebook()
            .then(socialAuthUser => {
                // Create a user in your Firebase Realtime Database too
                return this.props.firebase
                    .user(socialAuthUser.user.uid)
                    .set({
                        username: socialAuthUser.additionalUserInfo.profile.name,
                        email: socialAuthUser.additionalUserInfo.profile.email,
                        roles: {},
                    });
            })
            .then(socialAuthUser => {
                this.setState({ error: null });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }
                this.setState({ error });
            });
        event.preventDefault();
    };
    render() {
        const { error } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <button type="submit">Sign In with Facebook</button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

class SignInTwitterBase extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }
    onSubmit = event => {
        this.props.firebase
            .doSignInWithTwitter()
            .then(socialAuthUser => {
                // Create a user in your Firebase Realtime Database too
                return this.props.firebase
                    .user(socialAuthUser.user.uid)
                    .set({
                        username: socialAuthUser.additionalUserInfo.profile.name,
                        email: socialAuthUser.additionalUserInfo.profile.email,
                        roles: {},
                    });
            })
            .then(socialAuthUser => {
                this.setState({ error: null });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }
                this.setState({ error });
            });
        event.preventDefault();
    };
    render() {
        const { error } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <button type="submit">Sign In with Twitter</button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

const SignInGoogle = compose(
    withRouter,
    withFirebase,
)(SignInGoogleBase);

const SignInFacebook = compose(
    withRouter,
    withFirebase,
)(SignInFacebookBase);

const SignInTwitter = compose(
    withRouter,
    withFirebase,
)(SignInTwitterBase);

export default SignInPage;
export { SignInForm, SignInGoogle, SignInFacebook, SignInTwitter };