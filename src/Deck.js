import React, { Component } from 'react';
import Card from './Card';
export default class Deck extends Component {

  render(){
    return(
      <ul>
        {this.props.cards.map((card, index) => {
          let currentCompare = this.props.current_up.indexOf(card) > -1;
          return  <li key={index}>
                    <Card
                      key={index} 
                      imgPath={card[0]["image"]}
                      currentCompare={currentCompare}
                      handleClick={() => this.props.handleClick(card)}
                      hasBeenGuessed = {card[1]}
                    />
                  </li>
          })
        }
      </ul>
    );
  }
}
