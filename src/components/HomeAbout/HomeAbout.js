import React from 'react';
import People from "../../assets/People.jpg";
import Decoration from "../../assets/Decoration.svg";
import Signature from "../../assets/Signature.svg"

const HomeAbout = () => (
    <section className="sectionContainer aboutUs" name="aboutUs">
        <div className="aboutUs--leftColumn">
            <p className="aboutUs--title">O nas</p>
            <img src={Decoration} alt="decoration"/>
            <p className="aboutUs--description">Nori grape silver beet broccoli kombu beet greens fava bean potato quandong celery. Bunya nuts black-eyed pea prairie turnip leek lentil turnip greens parsnip.</p>
            <img src={Signature} alt="Signature" className="signature"/>
        </div>
        <div className="aboutUs--rightColumn">
            <img src={People} alt="People"/>
        </div>
    </section>
);

export default HomeAbout;


