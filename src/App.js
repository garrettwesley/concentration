import React, { Component } from 'react';
import Deck from './Deck';
import Modal from './Modal';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
          cards: [],
          current_up: [],
          currentCompare: false,
          numMatches: 0,
          game: false,
          numGuesses: 0,
          gameOver: false
        };
    }

    fetchCards(){
      fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=52")
        .then(results => {
          return results.json()})
          .then(data => {
            let deck = data.cards.map(function (e, i) {
              return [data.cards[i], false];
            });
            this.setState({cards: deck});
          })
    }

    componentDidMount(){
      this.fetchCards();
    }

    render() {
      let body = ''
      let height = "100vh";
      let hud = '';

      if(this.state.gameOver){
      }

      if (this.state.game) {
        height = "200px";
        body =  <Deck 
                  cards = { this.state.cards }
                  current_up = { this.state.current_up }
                  handleClick = { (cards) => this.handleClick(cards) }
                />  
        hud = <div style={{paddingTop: '10px'}}className="numGuesses">Guesses: {this.state.numGuesses}</div>     
      }

      return (
          <div className="container">
              <header style={{height: height}}>
                <h1>CONCENTRATION</h1>
                {hud}
                <a onClick={() => this.reset()} id="new-game-button">New Game</a>
              </header>
              <div id="game">
                {body}
              </div>

              {this.state.gameOver && 
                <Modal
                  numGuesses={this.state.numGuesses}
                  reset={() => this.reset()}
                />
              }
              
          </div>
      );
    }

    handleClick(cards){
      if(this.state.currentCompare || this.state.current_up.indexOf(cards) > -1 || cards[1]){
        return;
      }

      const current_up = [...this.state.current_up, cards];
      this.setState({
        current_up
      });

      if(current_up.length === 2){
        this.compareCards(current_up);
      }
    }

    compareCards(current_up){  
      this.setState({currentCompare: true});

      setTimeout(() => {
        const [firstcards, secondcards] = current_up;

        if(firstcards[0]["value"] === secondcards[0]["value"]){
          firstcards[1] = true;
          secondcards[1] = true;
          this.setState({numMatches: this.state.numMatches + 1})
        }

        if (this.state.numMatches === 26) {
          this.setState({gameOver: true})
          //this.reset();
        }

        this.setState({
          current_up: [],
          currentCompare: false,
          numGuesses: this.state.numGuesses + 1
        });
      }, 700);
    }

    reset(){
        this.setState({
          game: true,
          cards: [],
          current_up: [],
          currentCompare: false,
          numGuesses: 0,
          gameOver: false,
          numMatches: 0
        });
        this.fetchCards();
    }
}