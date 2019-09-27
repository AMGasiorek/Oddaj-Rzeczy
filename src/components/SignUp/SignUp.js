import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import TopMenu from "../TopMenu/TopMenu";
import Decoration from "../../assets/Decoration.svg";


const SignUpPage = () => (
    <>
        <div className="topMenuContainer">
            <div className="topMenuContainer--leftMargin"> </div>
            <TopMenu/>
            <div className="topMenuContainer--rightMargin"> </div>
        </div>
        <SignUpForm />
    </>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    emailError: false,
    passwordLengthError: false,
    notTheSamePasswordError: false,
    isAdmin: false,
    error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign-in with one of them. Afterward, associate your accounts
  on your personal account page.
`;


class SignUpFormBase extends Component {

    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {

        event.preventDefault();
        const { username, email, passwordOne, isAdmin } = this.state;
        const emailFilter = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const roles = {};
        if (isAdmin) {
            roles[ROLES.ADMIN] = ROLES.ADMIN;
        }

        if (emailFilter.test(email) === false) {
            this.setState({ emailError: true });
            return;
        } else {
            this.setState({ emailError: false });
        }

        if (passwordOne.length < 6) {
            this.setState({ passwordLengthError: true });
            return;
        } else {
            this.setState({ passwordLengthError: false });
        }

        if (passwordOne !== this.state.passwordTwo) {
            this.setState({ notTheSamePasswordError: true });
            return;
        } else {
            this.setState({ notTheSamePasswordError: false });
        }


        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Create a user in your Firebase realtime database
                return this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
                        roles,
                    });
            })
            .then(() => {
                return this.props.firebase.doSendEmailVerification();
            })
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
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

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onChangeCheckbox = event => {
        this.setState({ [event.target.name]: event.target.checked });
    };

    render() {

        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            emailError,
            passwordLengthError,
            notTheSamePasswordError,
            // isAdmin,
            error,
        } = this.state;

        // const emailFilter = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const isInvalid =
            emailError === true ||
            passwordLengthError === true ||
            notTheSamePasswordError === true ||
            username === '';

        return (
            <div className="signForms--container">
                <p className="signForms--title">Załóż konto</p>
                <img src={Decoration} alt="decoration"/>
                <form onSubmit={this.onSubmit} className="signForms">
                    <div className="signForms--inputField">
                        <p className="signForms--label">Nazwa użytkownika</p>
                        <input
                            name="username"
                            value={username}
                            onChange={this.onChange}
                            type="text"
                            placeholder=""
                        />
                        <div className="signForms--underline"></div>
                        <p className="signForms--label">Email</p>
                        <input
                            name="email"
                            value={email}
                            onChange={this.onChange}
                            type="text"
                            placeholder=""
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
                            name="passwordOne"
                            value={passwordOne}
                            onChange={this.onChange}
                            type="password"
                            placeholder=""
                        />
                        {this.state.passwordLengthError === true ?
                            <div className="signForms--underline__error">
                                <p className="signForms--validation__error">Hasło musi posiadać co najmniej 6 znaków</p>
                            </div> :
                            <div className="signForms--underline">
                                <p className="signForms--validation"> </p>
                            </div>
                        }
                        <p className="signForms--label">Powtórz hasło</p>
                        <input
                            name="passwordTwo"
                            value={passwordTwo}
                            onChange={this.onChange}
                            type="password"
                            placeholder=""
                        />
                        {this.state.notTheSamePasswordError === true ?
                            <div className="signForms--underline__error">
                                <p className="signForms--validation__error">Hasła muszą być takie same</p>
                            </div> :
                            <div className="signForms--underline">
                                <p className="signForms--validation"> </p>
                            </div>
                        }
                        {error && <p className="signForms--validation__error">{error.message}</p>}

                        {/*Możliwość zarejestrowania się jako admin*/}

                        {/*<label>*/}
                        {/*    Admin:*/}
                        {/*    <input*/}
                        {/*        name="isAdmin"*/}
                        {/*        type="checkbox"*/}
                        {/*        checked={isAdmin}*/}
                        {/*        onChange={this.onChangeCheckbox}*/}
                        {/*    />*/}
                        {/*</label>*/}

                    </div>
                    <div className="signForms--buttonsContainer">
                        <button disabled={isInvalid} className="mediumButton">Załóż konto</button>
                    </div>
                </form>
            </div>
        );
    }
}


const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

const SignUpLink = () => (
    <Link to={ROUTES.SIGN_UP} className="mediumButton">Załóż konto</Link>
);
export default SignUpPage;
export { SignUpForm, SignUpLink };