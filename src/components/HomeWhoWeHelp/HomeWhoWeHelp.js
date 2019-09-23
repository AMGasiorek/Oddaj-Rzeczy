import React, {Component} from 'react';
import Decoration from "../../assets/Decoration.svg";
import HelpLists from "../../assets/HelpLists";

const HomeWhoWeHelp = () => (
    <section className="sectionContainer">
        <div className="whoWeHelp--upperPart">
            <p className="whoWeHelp--title">Komu pomagamy</p>
            <img src={Decoration} alt="decoration"/>
        </div>
        <WhoWeHelpList/>
    </section>
);


class WhoWeHelpList extends Component {

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
                        <>
                            <p className="whoWeHelp--list__description">{HelpLists.listOne.description}</p>
                            <ul>
                                {HelpLists.listOne.list.map(listItem => (
                                    <WhoWeHelpListItem
                                        key={listItem.key}
                                        name={listItem.name}
                                        mission={listItem.mission}
                                        collectedProducts={listItem.collectedProducts} />
                                ))}
                            </ul>
                        </>
                    )}
                    {this.state.listTwoIsVisible === true && (
                        <>
                            <p className="whoWeHelp--list__description">{HelpLists.listTwo.description}</p>
                            <ul>
                                {HelpLists.listTwo.list.map(listItem => (
                                    <WhoWeHelpListItem
                                        key={listItem.key}
                                        name={listItem.name}
                                        mission={listItem.mission}
                                        collectedProducts={listItem.collectedProducts} />
                                ))}
                            </ul>
                        </>
                    )}
                    {this.state.listThreeIsVisible === true && (
                        <>
                            <p className="whoWeHelp--list__description">{HelpLists.listThree.description}</p>
                            <ul>
                                {HelpLists.listThree.list.map(listItem => (
                                    <WhoWeHelpListItem
                                        key={listItem.key}
                                        name={listItem.name}
                                        mission={listItem.mission}
                                        collectedProducts={listItem.collectedProducts} />
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </>
        )
    }
}

class WhoWeHelpListItem extends Component {

    render () {
        const {key, name, mission, collectedProducts} = this.props;
        return (
            <li key={key} className="whoWeHelp--list__item">
                <div>
                    <p className="p1">Organizacja "{name}"</p>
                    <p className="p2">Misja: {mission}</p>
                </div>
                <div>
                    <span>{collectedProducts}</span>
                </div>
            </li>
        )
    }
}

export default HomeWhoWeHelp;
