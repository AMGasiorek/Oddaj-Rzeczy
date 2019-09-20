import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import TopMenu from "../TopMenu/TopMenu";
import Decoration from "../../assets/Decoration.svg";

const PasswordForgetPage = () => (
    <>
        <div className="topMenuContainer">
            <div className="topMenuContainer--leftMargin"></div>
            <TopMenu/>
            <div className="topMenuContainer--rightMargin"></div>
        </div>
        <PasswordForgetForm />
    </>
);

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetFormBase extends Component {

    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email } = this.state;
        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
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
        const { email, error } = this.state;
        const isInvalid = email === '';
        return (
            <div className="signForms--container">
                <p className="signForms--title">Zresetuj hasło</p>
                <img src={Decoration} alt="decoration"/>
                <form onSubmit={this.onSubmit} className="signForms">
                    <div className="signForms--inputField">
                        <p className="signForms--label">Wpisz swój adres email</p>
                        <input
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Email Address"
                        />
                        <div className="signForms--underline"></div>
                    </div>
                    <div className="signForms--buttonsContainer">
                        <button disabled={isInvalid} type="submit" className="mediumButton">Zresetuj Hasło</button>
                        {error && <p>{error.message}</p>}
                    </div>
                </form>
            </div>
        );
    }
}

const PasswordForgetLink = () => (
    <p className="signLinks">
        <Link to={ROUTES.PASSWORD_FORGET} className="smallButton">Zapomniałeś hasła?</Link>
    </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };