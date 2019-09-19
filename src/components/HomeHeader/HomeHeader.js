import React from 'react';
import HeroImage from "../../assets/Home-Hero-Image.jpg";
import TopMenu from "../TopMenu/TopMenu";
import Intro from "../Intro/Intro";


const HomeHeader = () => (

    <header className="sectionContainer">
        <div className="header--leftColumn">
            <img src={HeroImage} alt="HeroImage"/>
        </div>
        <div className="header--rightColumn">
            <TopMenu/>
            <Intro/>
        </div>
    </header>
);


export default HomeHeader;