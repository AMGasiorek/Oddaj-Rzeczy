import React from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session/Session';



const HomePage = () => (
    <>
        <div className="row">
            <div className="col-12">
                <h1>Widok główny aplikacji</h1>
                <p>Tutaj będzie widok główny aplikacji. Do strony mogą się zalogować tylko zarejstrowani użytkownicy.</p>
            </div>
        </div>
        <div className="row">
            <div className="col-6">

            </div>
            <div className="col-6">

            </div>
        </div>
    </>
);


const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(HomePage);