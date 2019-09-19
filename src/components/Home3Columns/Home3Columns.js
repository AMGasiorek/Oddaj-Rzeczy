import React, {Component} from 'react';

const Home3Columns = () => (
    <section className="sectionContainer home3Columns">
        <div className="sectionInnerContainer home3Columns">
            <Column1/>
            <Column2/>
            <Column3/>
        </div>
    </section>
);


class Column1 extends Component {
    state ={
        counter: 0,
        counterEnd: 10
    };


    componentDidMount(){

        this.intervalId = setInterval(
            () => this.setState( { counter: this.state.counter + 1 } ),
            3000/this.state.counterEnd
        )
    }

    componentWillUnmount(){
        clearInterval( this.intervalId );
    }

    render () {
        let counter;

        if(this.state.counter < this.state.counterEnd){
            counter = this.state.counter;
        }else{
            counter = this.state.counterEnd;
        }
        return (
            <div>
                <p className="counter">{counter}</p>
                <p className="counter--description">oddanych worków</p>
                <p className="counter--text">Lorem ipsum dolor sit amet, consectetur adipisc
                    Pellentesque vel enim a elit viverra elementuma.
                    Aliquam erat volutpat. </p>
            </div>
        )
    }
}

class Column2 extends Component {
    state ={
        counter: 0,
        counterEnd: 5
    };

    componentDidMount(){

        this.intervalId = setInterval(
            () => this.setState( { counter: this.state.counter + 1 } ),
            3000/this.state.counterEnd
        )
    }

    componentWillUnmount(){
        clearInterval( this.intervalId );
    }

    render () {
        let counter;

        if(this.state.counter < this.state.counterEnd){
            counter = this.state.counter;
        }else{
            counter = this.state.counterEnd;
        }
        return (
            <div>
                <p className="counter">{counter}</p>
                <p className="counter--description">wspartych organizacji</p>
                <p className="counter--text">Lorem ipsum dolor sit amet, consectetur adipisc
                    Pellentesque vel enim a elit viverra elementuma.
                    Aliquam erat volutpat. </p>
            </div>
        )
    }
}

class Column3 extends Component {
    state ={
        counter: 0,
        counterEnd: 7
    };

    componentDidMount(){

        this.intervalId = setInterval(
            () => this.setState( { counter: this.state.counter + 1 } ),
            3000/this.state.counterEnd
        )
    }

    componentWillUnmount(){
        clearInterval( this.intervalId );
    }

    render () {
        let counter;

        if(this.state.counter < this.state.counterEnd){
            counter = this.state.counter;
        }else{
            counter = this.state.counterEnd;
        }
        return (
            <div>
                <p className="counter">{counter}</p>
                <p className="counter--description">zorganizowanych zbiórek</p>
                <p className="counter--text">Lorem ipsum dolor sit amet, consectetur adipisc
                    Pellentesque vel enim a elit viverra elementuma.
                    Aliquam erat volutpat. </p>
            </div>
        )
    }
}

export default Home3Columns;
