import React, {Component} from 'react';
import Decoration from "../../assets/Decoration.svg";
import HelpLists from "../../assets/HelpLists";

const HomeWhoWeHelp = () => (
    <section className="sectionContainer" name="WhoWeHelp">
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
            currentList: 1,
            currentPage: 1,
            institutionPerPage: 3
        };
    }

    HandleClick = (event) => {

        switch (event.target.id) {
            case HelpLists.listOne.key.toString():
                this.setState({currentList: 1});
                break;
            case HelpLists.listTwo.key.toString():
                this.setState({currentList: 2});
                break;
            case HelpLists.listThree.key.toString():
                this.setState({currentList: 3});
                break;
            default:
                console.log("pudło");
                break;
        }
    };

    pageNumberClick = (event, i) => {
        this.setState({currentPage: i})
    };

    render() {
        const {currentList, currentPage, institutionPerPage} = this.state;

        const list = () => {
            if (currentList === 1) {
                return HelpLists.listOne
            } else if (currentList === 2) {
                return HelpLists.listTwo
            } else if (currentList === 3){
                return HelpLists.listThree
            }
        };

        const PageNumbers = [];
        for (let i=1; i <= Math.ceil(list().list.length/institutionPerPage); i++) {
            const pageNumber = <li key={i} onClick={e=>this.pageNumberClick(e,i)}>{i}</li>;
            PageNumbers.push(pageNumber)
        }

        const indexOfLast = currentPage * institutionPerPage;
        const indexOfFirst = indexOfLast - institutionPerPage;
        const currentInstitutions = list().list.slice(indexOfFirst, indexOfLast);

        return (
            <>
                <div className="buttonsRow">
                    <button id={HelpLists.listOne.key} className="mediumButton" onClick={this.HandleClick}>{HelpLists.listOne.displayedText}</button>
                    <button id={HelpLists.listTwo.key} className="mediumButton" onClick={this.HandleClick}>{HelpLists.listTwo.displayedText}</button>
                    <button id={HelpLists.listThree.key} className="mediumButton" onClick={this.HandleClick}>{HelpLists.listThree.displayedText}</button>
                </div>
                <div className="whoWeHelp--list">

                    <p className="whoWeHelp--list__description">{list().description}</p>

                    <ul>
                        {currentInstitutions.map(listItem =>
                            <li key={listItem.key} className="whoWeHelp--list__item">
                                <div>
                                    <p className="p1">Organizacja "{listItem.name}"</p>
                                    <p className="p2">Misja: {listItem.mission}</p>
                                </div>
                                <div>
                                    <span>{listItem.collectedProducts}</span>
                                </div>
                            </li>
                        )}
                    </ul>

                    <ul className="pageNumbers">
                        {PageNumbers}
                    </ul>

                </div>
            </>
        )
    }
}

export default HomeWhoWeHelp;
