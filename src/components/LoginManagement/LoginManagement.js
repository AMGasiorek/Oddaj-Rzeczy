import React, { Component } from 'react';
import { withFirebase } from '../Firebase/Context';
import { faGoogle, faFacebook, faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SIGN_IN_METHODS = [
    {
        id: 'hasło',
        name: 'Hasło',
        provider: null,
        icon: null,
    },
    {
        id: 'google.com',
        name: 'Google',
        provider: 'googleProvider',
        icon: faGoogle,
    },
    {
        id: 'facebook.com',
        name: 'Facebook',
        provider: 'facebookProvider',
        icon: faFacebook,
    },
    {
        id: 'twitter.com',
        name: 'Twitter',
        provider: 'twitterProvider',
        icon: faTwitterSquare,
    },
];


const SocialLoginToggle = ({
                               onlyOneLeft,
                               isEnabled,
                               signInMethod,
                               onLink,
                               onUnlink,
                           }) =>
    isEnabled ? (
        <button
            type="button"
            onClick={() => onUnlink(signInMethod.id)}
            disabled={onlyOneLeft}
            className="smallButton"
        >
            aktywna {signInMethod.name} <FontAwesomeIcon icon={signInMethod.icon} className="logo--icon"/>
        </button>
    ) : (
        <button
            type="button"
            onClick={() => onLink(signInMethod.provider)}
            className="smallButton__delete"
        >
            nieaktywna {signInMethod.name} <FontAwesomeIcon icon={signInMethod.icon} className="logo--icon"/>
        </button>
    );

class DefaultLoginToggle extends Component {
    constructor(props) {
        super(props);
        this.state = { passwordOne: '', passwordTwo: '' };
    }
    onSubmit = event => {
        event.preventDefault();
        this.props.onLink(this.state.passwordOne);
        this.setState({ passwordOne: '', passwordTwo: '' });
    };
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    render() {
        const {
            onlyOneLeft,
            isEnabled,
            signInMethod,
            onUnlink,
        } = this.props;
        const { passwordOne, passwordTwo } = this.state;
        const isInvalid =
            passwordOne !== passwordTwo || passwordOne === '';
        return isEnabled ? (
            <button
                type="button"
                onClick={() => onUnlink(signInMethod.id)}
                disabled={onlyOneLeft}
            >
                Deactivate {signInMethod.id}
            </button>
        ) : (
            <form onSubmit={this.onSubmit}>
                <input
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="New Password"
                />
                <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm New Password"
                />
                <button disabled={isInvalid} type="submit">
                    Link {signInMethod.id}
                </button>
            </form>
        );
    }
}

class LoginManagementBase extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeSignInMethods: [],
            error: null,
        };
    }

    componentDidMount() {
        this.fetchSignInMethods();
    }

    fetchSignInMethods = () => {
        this.props.firebase.auth
            .fetchSignInMethodsForEmail(this.props.authUser.email)
            .then(activeSignInMethods =>
                this.setState({ activeSignInMethods, error: null }),
            )
            .catch(error => this.setState({ error }));
    };

    onSocialLoginLink = provider => {
        this.props.firebase.auth.currentUser
            .linkWithPopup(this.props.firebase[provider])
            .then(this.fetchSignInMethods)
            .catch(error => this.setState({ error }));
    };

    onUnlink = providerId => {
        this.props.firebase.auth.currentUser
            .unlink(providerId)
            .then(this.fetchSignInMethods)
            .catch(error => this.setState({ error }));
    };

    onDefaultLoginLink = password => {
        const credential = this.props.firebase.emailAuthProvider.credential(
            this.props.authUser.email,
            password,
        );
        this.props.firebase.auth.currentUser
            .linkAndRetrieveDataWithCredential(credential)
            .then(this.fetchSignInMethods)
            .catch(error => this.setState({ error }));
    };


    render() {
        const { activeSignInMethods, error } = this.state;
        return (
            <div>
                Metody logowania:
                <ul>
                    {SIGN_IN_METHODS.map(signInMethod => {
                        const onlyOneLeft = activeSignInMethods.length === 1;
                        const isEnabled = activeSignInMethods.includes(
                            signInMethod.id,
                        );
                        return (
                            <li key={signInMethod.id}>
                                {signInMethod.id === 'password' ? (
                                    <DefaultLoginToggle
                                        onlyOneLeft={onlyOneLeft}
                                        isEnabled={isEnabled}
                                        signInMethod={signInMethod}
                                        onLink={this.onDefaultLoginLink}
                                        onUnlink={this.onUnlink}
                                    />
                                ) : (
                                    <SocialLoginToggle
                                        onlyOneLeft={onlyOneLeft}
                                        isEnabled={isEnabled}
                                        signInMethod={signInMethod}
                                        onLink={this.onSocialLoginLink}
                                        onUnlink={this.onUnlink}
                                    />
                                )}
                            </li>
                        );
                    })}
                </ul>
                {error && error.message}
            </div>
        );
    }
}


const LoginManagement = withFirebase(LoginManagementBase);

export default LoginManagement