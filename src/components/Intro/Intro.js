import React from 'react';
import Decoration from '../../assets/Decoration.svg';
import GiveThingsButton from "../GiveThingsButton/GiveThingsButton";
import FundRaisingButton from "../FundRaisingButton/FundRaisingButton";


const Intro = () => (

    <div className="intro">
        <div className="intro--title">
            <div className="intro--title__text">
                <p>Zacznij pomagać!</p>
                <p>Oddaj niechciane rzeczy w zaufane ręce</p>
            </div>
            <img src={Decoration} alt="decoration"/>
        </div>
        <div className="intro--buttons">
            <GiveThingsButton/>
            <FundRaisingButton/>
        </div>
    </div>
);


export default Intro;