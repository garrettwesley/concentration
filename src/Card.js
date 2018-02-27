import React, { Component } from 'react';

export default class Card extends Component{
    render(){
        let img = <img className={'card'} src="./images/playing-card-back.png"/>

        if (this.props.currentCompare) {
            img = <img className={'card'} src={this.props.imgPath} />
        } else if (this.props.hasBeenGuessed) {
            img = <img className={'card guessed'} src={this.props.imgPath} />
        }

        return (
            <div className="card" onClick={this.props.handleClick}>
                {img}
            </div>
        );
    }
}