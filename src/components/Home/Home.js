import React from 'react';
import HomeHeader from "../HomeHeader/HomeHeader";
import Home3Columns from "../Home3Columns/Home3Columns";
import HomeSimpleSteps from "../HomeSimpleSteps/HomeSimpleSteps";
import HomeAbout from "../HomeAbout/HomeAbout";
import HomeWhoWeHelp from "../HomeWhoWeHelp/HomeWhoWeHelp";
import Contact from "../Contact/Contact";


const Home = () => (

    <>
        <HomeHeader/>
        <Home3Columns/>
        <HomeSimpleSteps/>
        <HomeAbout/>
        <HomeWhoWeHelp/>
        <Contact/>
    </>
);

export default Home;