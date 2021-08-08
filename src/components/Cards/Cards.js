import React, { Component } from 'react';
import chipImg from '../../images/chip.png';
import visaImg from '../../images/visa.png';
import masterCardImg from '../../images/mastercard.png';
import amexImg from '../../images/amex.png';

import './cards.css';

export class Cards extends Component {
    render() {
        const {cardNumber, cardName, cardDate, cardCvv, cardNumFocused, cardNameFocused, cardDateFocused, cardCvvFocused, cardType } = this.props;
        let titleImage = visaImg;
        switch(cardType) {
            case "mastercard" :
                titleImage = masterCardImg
                break;
            case "amex" :
                titleImage = amexImg
                break;
            default :
                titleImage = visaImg
        }

        return (
            <div>
                {
                    !cardCvvFocused ? (
                        <div className="credit-card-container">
                            <div className="info-card-chip">
                                <img src={chipImg} alt="" />
                            </div>
                            <div className="card-image">
                                <img src={titleImage} alt="" />
                            </div>
                            <div className={`card-number ${cardNumFocused ? "bordered" : ''}`}>{cardNumber}</div>
                            <div className={`card-name ${cardNameFocused ? "bordered" : ''} `}>
                                <p className="info-title">Card Holder</p>
                                <p className="card-holder">{cardName}</p>
                            </div>
                            <div className={`date-container ${cardDateFocused ? "bordered" : ''} `}>
                                <p className="info-title">Expires</p>
                                <p className="card-holder">{cardDate[0]+"/"+cardDate[1]}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="credit-card-container">
                            <div className="black-strip"></div>
                            <p className="cvv-text">CVV</p>
                            <div className="display-cvv">{cardCvv}</div>
                            <div className="card-image-back">
                                <img src={titleImage} alt="" />
                            </div>
                        </div> 
                    )       
                }
            </div>
            
        )
    }
}

export default Cards
