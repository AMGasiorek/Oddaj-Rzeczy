import React, {Component} from 'react';
import Decoration from "../../assets/Decoration.svg";

const HomeWhoWeHelp = () => (
    <section className="sectionContainer">
        <div className="whoWeHelp--upperPart">
            <p className="whoWeHelp--title">Komu pomagamy</p>
            <img src={Decoration} alt="decoration"/>
        </div>
        <WhoWeHelpInteracitveList/>
    </section>
);

const HelpLists = {
    listOne: {key: 1, name: "Fundacje", displayedText: "Fundacjom", description: "W naszej bazie znajdziesz listę zweryfikowanych Fundacji, z którymi współpracujemy. Możesz sprawdzić czym się zajmują, komu pomagają i czego potrzebują."},
    listTwo: {key: 2, name: "Organizacje", displayedText: "Organizacjom pozarządowym", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."},
    listThree: {key: 3, name: "Zbiórki", displayedText: "Lokalnym zbiórkom", description: "Jeszcze jakiś inny teksto-wypełniacz lub Lorem Ipsum lub Food Ipsum i tak dalej"},
};

class WhoWeHelpInteracitveList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listOneIsVisible: true,
            listTwoIsVisible: false,
            listThreeIsVisible: false,
        };
    }

    HandleOnClick = (event) => {

        switch (event.target.id) {
            case HelpLists.listOne.key.toString():
                this.setState({listOneIsVisible: true, listTwoIsVisible: false, listThreeIsVisible: false});
                break;
            case HelpLists.listTwo.key.toString():
                this.setState({listOneIsVisible: false, listTwoIsVisible: true, listThreeIsVisible: false});
                break;
            case HelpLists.listThree.key.toString():
                this.setState({listOneIsVisible: false, listTwoIsVisible: false, listThreeIsVisible: true});
                break;
            default:
                console.log("pudło");
                break;
        }
    };

    render() {

        return (
            <>
                <div className="buttonsRow">
                    <button id={HelpLists.listOne.key} className="mediumButton" onClick={this.HandleOnClick}>{HelpLists.listOne.displayedText}</button>
                    <button id={HelpLists.listTwo.key} className="mediumButton" onClick={this.HandleOnClick}>{HelpLists.listTwo.displayedText}</button>
                    <button id={HelpLists.listThree.key} className="mediumButton" onClick={this.HandleOnClick}>{HelpLists.listThree.displayedText}</button>
                </div>
                <div className="whoWeHelp--list">
                    {this.state.listOneIsVisible === true && (
                        <p className="whoWeHelp--list__description">{HelpLists.listOne.description}</p>
                    )}
                    {this.state.listTwoIsVisible === true && (
                        <p className="whoWeHelp--list__description">{HelpLists.listTwo.description}</p>
                    )}
                    {this.state.listThreeIsVisible === true && (
                        <p className="whoWeHelp--list__description">{HelpLists.listThree.description}</p>
                    )}
                </div>
            </>
        )
    }
}

export default HomeWhoWeHelp;
