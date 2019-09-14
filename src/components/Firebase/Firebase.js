import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyBIfUrWN3Dhw8JJ7wcG-SK9jPLgfvrMEfo",
    authDomain: "oddaj-rzeczy.firebaseapp.com",
    databaseURL: "https://oddaj-rzeczy.firebaseio.com",
    projectId: "oddaj-rzeczy",
    storageBucket: "oddaj-rzeczy.appspot.com",
    messagingSenderId: "628154324096",
    appId: "1:628154324096:web:2cb07fd5d07e3a80f9c265"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
        this.emailAuthProvider = app.auth.EmailAuthProvider;
        this.googleProvider = new app.auth.GoogleAuthProvider();
        this.facebookProvider = new app.auth.FacebookAuthProvider();
        this.twitterProvider = new app.auth.TwitterAuthProvider();

        /* Helper */
        this.serverValue = app.database.ServerValue;
    }
    // *** Auth API ***
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSendEmailVerification = () =>
        this.auth.currentUser.sendEmailVerification({
            url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
        });

    doSignInWithGoogle = () =>
        this.auth.signInWithPopup(this.googleProvider);

    doSignInWithFacebook = () =>
        this.auth.signInWithPopup(this.facebookProvider);

    doSignInWithTwitter = () =>
        this.auth.signInWithPopup(this.twitterProvider);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    // *** Merge Auth and DB User API *** //
    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .once('value')
                    .then(snapshot => {
                        const dbUser = snapshot.val();
                        // default empty roles
                        if (!dbUser.roles) {
                            dbUser.roles = {};
                        }
                        // merge auth and db user
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            emailVerified: authUser.emailVerified,
                            providerData: authUser.providerData,
                            ...dbUser,
                        };
                        next(authUser);
                    });
            } else {
                fallback();
            }
        });

    // *** User API ***
    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');


    // *** Message API ***
    message = uid => this.db.ref(`messages/${uid}`);

    messages = () => this.db.ref('messages');

    // *** Income API ***
    income = uid => this.db.ref(`incomes/${uid}`);

    incomes = () => this.db.ref('incomes');

    // *** Income API ***
    expenditure = uid => this.db.ref(`expenditures/${uid}`);

    expenditures = () => this.db.ref('expenditures');

}


export default Firebase;


