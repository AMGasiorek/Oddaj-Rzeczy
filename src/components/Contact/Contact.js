import React, {Component} from 'react';
import Decoration from "../../assets/Decoration.svg";
// import * as ROUTES from "../../constants/routes";

const INITIAL_STATE = {
    yourName: '',
    email: '',
    message: '',
    yourNameError: false,
    emailError: false,
    messageLengthError: false,
    submitDone: false,
    error: null,
};

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {

        event.preventDefault();


        this.setState({yourName: '', email: '', message: '', submitDone: true});
        // this.props.firebase
        //     .doCreateUserWithEmailAndPassword(email, passwordOne)
        //     .then(authUser => {
        //         // Create a user in your Firebase realtime database
        //         return this.props.firebase
        //             .user(authUser.user.uid)
        //             .set({
        //                 username,
        //                 email,
        //                 roles,
        //             });
        //     })
        //     .then(() => {
        //         return this.props.firebase.doSendEmailVerification();
        //     })
        //     .then(authUser => {
        //         this.setState({ ...INITIAL_STATE });
        //         this.props.history.push(ROUTES.HOME);
        //     })
        //     .catch(error => {
        //         if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
        //             error.message = ERROR_MSG_ACCOUNT_EXISTS;
        //         }
        //
        //         this.setState({ error });
        //     });
        event.preventDefault();
    };

    onChange = event => {

        const {yourName, email, message} = this.state;
        const yourNameFilter = /[^A-Za-z]/;
        const emailFilter = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (yourNameFilter.test(yourName) === true){
            this.setState({ yourNameError: true });
        } else {
            this.setState({ yourNameError: false });
        }

        if (emailFilter.test(email) === false) {
            this.setState({ emailError: true });
        } else {
            this.setState({ emailError: false });
        }

        if (message.length < 120) {
            this.setState({ messageLengthError: true });
        } else {
            this.setState({ messageLengthError: false });
        }

        this.setState({ [event.target.name]: event.target.value });


    };

    render() {

        const {
            yourName,
            email,
            message,
            yourNameError,
            emailError,
            messageLengthError,
            submitDone,
            error,
        } = this.state;

        const isInvalid = yourNameError === true || emailError === true || messageLengthError === true;

        return (

            <section className="sectionContainer" name="Contact">
                <div className="contactSectionBackground">""</div>
                <div className="contactFormContainer">
                    <p className="contactForm--title">Skontaktuj się z nami</p>
                    <img src={Decoration} alt="decoration"/>
                    <div className="submitStatus">
                        {submitDone && (<p>Wiadomość została wysłana!<br></br> Wkrótce się skontaktujemy.</p>)}
                    </div>
                    <form onSubmit={this.onSubmit} className="contactForm">
                        <div className="contactForm--inputsRow">
                            <div className="contactForm--inputField">
                                <p className="contactForm--label">Wpisz swoję imię</p>
                                <input
                                    name="yourName"
                                    value={yourName}
                                    onChange={this.onChange}
                                    type="text"
                                    placeholder="Krzysztof"
                                />
                                {yourNameError === true ?
                                    <div className="contactForm--underline__error">
                                        <p className="contactForm--validation__error">Wpisz poprawnie swoje imię</p>
                                    </div> :
                                    <div className="contactForm--underline">
                                        <p className="contactForm--validation"></p>
                                    </div>
                                }
                            </div>
                            <div className="contactForm--inputField">
                                <p className="contactForm--label">Email</p>
                                <input
                                    name="email"
                                    value={email}
                                    onChange={this.onChange}
                                    type="text"
                                    placeholder="abc@xyz.pl"
                                />
                                {emailError === true ?
                                    <div className="contactForm--underline__error">
                                        <p className="contactForm--validation__error">Wpisz poprawny adres email</p>
                                    </div> :
                                    <div className="contactForm--underline">
                                        <p className="contactForm--validation"></p>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="contactForm--messageRow">
                            <p className="contactForm--label">Wpisz swoją wiadomość</p>
                            <textarea
                                name="message"
                                value={message}
                                onChange={this.onChange}
                                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                            />
                            {messageLengthError === true ?
                                <div className="contactForm--underline__error">
                                    <p className="contactForm--validation__error">Wiadomość musi posiadać co najmniej 120
                                        znaków</p>
                                </div> :
                                <div className="contactForm--underline">
                                    <p className="contactForm--validation"></p>
                                </div>
                            }

                            {error && <p className="contactForm--validation__error">{error.message}</p>}

                        </div>
                        <div className="contactForm--buttonsContainer">
                            <button disabled={isInvalid} className="mediumButton">Wyślij</button>
                        </div>
                    </form>

                </div>

            </section>
        );
    }
}

export default Contact;
