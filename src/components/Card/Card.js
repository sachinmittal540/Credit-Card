import React, { Component, createRef } from 'react';
import { Input, Form, Select, Button } from 'antd';
import './card.css';
import lookup from './card.json';
import {GetCardType} from '../CardTypes/CardTypes';
import {Cards} from '../Cards/Cards';

const { Option } = Select;

export class Card extends Component {
    constructor() {
        super()
        this.cardNumberRef = createRef();
        this.state = {
            cardNumber: ["#", "#", "#", "#", " ", "#", "#", "#", "#", " ", "#", "#", "#", "#", " ", "#", "#", "#", "#"],
            cardType: "",
            cardName: "ad soyad",
            cardDate: ["MM", "YY"],
            cardCvv: "",
            cardNumFocused: false,
            cardNameFocused: false,
            cardDateFocused: false,
            cardCvvFocused: false,
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onCardNumberChange = (e) => {
        let {cardType} = this.state;
        let dummyValues = ["#", "#", "#", "#", " ", "#", "#", "#", "#", " ", "#", "#", "#", "#", " ", "#", "#", "#", "#"];
        cardType = GetCardType(e.target.value);
        e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
        for(var i=0; i<e.target.value.length; i++) {
            dummyValues[i] = e.target.value[i];
        }
        this.setState({cardNumber: dummyValues, cardType});
    }

    onMonthChange = (value) => {
        const {cardDate} = this.state;
        cardDate[0] = value;
        this.setState({cardDate});
    }

    onYearChange = (value) => {
        const {cardDate} = this.state;
        cardDate[1] = value.slice(value.length-2, value.length);
        this.setState({cardDate});
    }

    render() {
        const {cardNumber, cardName, cardDate, cardCvv, cardNumFocused, cardNameFocused, cardDateFocused, cardCvvFocused, cardType} = this.state;
        return (
            <section>
                <div className="info-container">
                    <Form style={{position: 'absolute', bottom: 0, width: '86%'}} autoComplete="off">
                        <Cards 
                            cardNumber={cardNumber}
                            cardName={cardName}
                            cardDate={cardDate}
                            cardCvv={cardCvv}
                            cardNumFocused={cardNumFocused}
                            cardNameFocused={cardNameFocused}
                            cardDateFocused={cardDateFocused}
                            cardCvvFocused={cardCvvFocused}
                            cardType={cardType.toLowerCase()}
                        />
                        <p>Card Number</p>
                        <Form.Item>
                            <Input 
                                name="cardNumber"
                                onChange={this.onCardNumberChange}
                                onFocus={() => {this.setState({cardNumFocused: true})}}
                                onBlur={() => {this.setState({cardNumFocused: false})}}
                                maxLength={16}
                            />
                        </Form.Item>
                        <p>Card Name</p>
                        <Form.Item>
                            <Input
                                name="cardName"
                                onChange={this.onChange} 
                                value={cardName}
                                onFocus={() => {this.setState({cardNameFocused: true})}}
                                onBlur={() => {this.setState({cardNameFocused: false})}}
                                maxLength={28}
                            />
                        </Form.Item>
                        <Form.Item style={{position: "relative", margin: 0}}>
                            <Form.Item style={{left: "0", display: "inline-flex"}}>
                                <p>Expiration Date</p>
                                <Select 
                                    name="cardMonth"
                                    style={{ width: 120 }}
                                    defaultValue={"Month"}
                                    onChange={(e) => {this.onMonthChange(e)}}
                                    onFocus={(e) => {this.setState({cardDateFocused: true})}}
                                    onBlur={() => {this.setState({cardDateFocused: false})}}
                                >
                                    {
                                        lookup.months.map((month, index) => {
                                            return <Option key={index} value={month}>{month}</Option>
                                        })
                                    }
                                </Select>
                                <Select
                                    name="cardYear"
                                    style={{ width: 120 }}
                                    defaultValue={"Year"}
                                    onChange={(e) => {this.onYearChange(e)}}
                                    onFocus={() => {this.setState({cardDateFocused: true})}}
                                    onBlur={() => {this.setState({cardDateFocused: false})}}
                                >
                                    {
                                        lookup.years.map((year, index) => {
                                            return <Option key={index} value={year}>{year}</Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item style={{position: "absolute", right: "0", display: "inline-flex"}}>
                                <p>CVV</p>
                                <Input 
                                    style={{ width: 120 }}
                                    name="cardCvv"
                                    onChange={this.onChange} 
                                    value={cardCvv}
                                    onFocus={() => {this.setState({cardCvvFocused: true})}}
                                    onBlur={() => {this.setState({cardCvvFocused: false})}}
                                    maxLength={4}
                                />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" size="large" block >Submit</Button>
                        </Form.Item>
                    </Form>
                </div>
            </section>
        )
    }
}

export default Card
