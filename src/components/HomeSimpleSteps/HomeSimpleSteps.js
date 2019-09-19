import React from 'react';
import Decoration from "../../assets/Decoration.svg";
import Icon1 from "../../assets/Icon-1.svg"
import Icon2 from "../../assets/Icon-2.svg"
import Icon3 from "../../assets/Icon-3.svg"
import Icon4 from "../../assets/Icon-4.svg"
import GiveThingsButton from "../GiveThingsButton/GiveThingsButton";

const HomeSimpleSteps = () => (
    <section className="sectionContainer homeSimpleSteps" name="SimpleSteps">
        <div className="whiteRow">
            <p>Wystarczą 4 proste kroki</p>
            <img src={Decoration} alt="decoration"/>
        </div>
        <div className="greyRow">
            <div className="stepsContainer">
                <div className="step">
                    <img src={Icon1} alt="Icon 1"/>
                    <p className="step--description">Wybierz rzeczy</p>
                    <div className="stepLine"></div>
                    <p className="step--text">ubrania, zabawki, sprzęt i inne</p>
                </div><div className="step">
                    <img src={Icon2} alt="Icon 2"/>
                    <p className="step--description">Spakuj je</p>
                    <div className="stepLine"></div>
                    <p className="step--text">skorzystaj z worków na śmieci</p>
                </div><div className="step">
                    <img src={Icon3} alt="Icon 3"/>
                    <p className="step--description">Zdecyduj komu chcesz pomóc</p>
                    <div className="stepLine"></div>
                    <p className="step--text">wybierz zaufane miejsce</p>
                </div><div className="step">
                    <img src={Icon4} alt="Icon 4"/>
                    <p className="step--description">Zamów kuriera</p>
                    <div className="stepLine"></div>
                    <p className="step--text">kurier przyjedzie w dogodnym terminie</p>
                </div>
            </div>
        </div>
        <div className="whiteRow">
            <GiveThingsButton/>
        </div>

    </section>
);

export default HomeSimpleSteps;
