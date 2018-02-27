import React, { Component } from 'react';

export default class Modal extends Component {
    render() {
        return (
            <div className="modal" >
                <h2>You won in {this.props.numGuesses} guesses!</h2>
                <a style={{color: 'black'}} onClick={this.props.reset} id="new-game-button">New Game</a>
            </div>
        );
    }
}
