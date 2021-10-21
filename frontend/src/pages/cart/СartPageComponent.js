import {Component} from 'react';

import './index.css';
import {addToCart, buyOrder, deleteOrder,getCart} from "../../api/api";
import React from "react";
import { withRouter } from "react-router";
import {Link} from "react-router-dom";
import {Nav} from "react-bootstrap";
import {ListGroup,CloseButton, Button}  from 'react-bootstrap';
import {BookItemComponent} from "../store/book-item/BookItemComponent";
import {CartItemComponent} from "./cart-item/CartItemComponent";

export default class CartPageComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            areOrdersLoading: false,
            order: [],
        };

        this.getOrders = this.getOrders.bind(this);
    }

    componentDidMount() {
        this.getOrders();
    }

    async getOrders(){
        this.setState({areOrdersLoading: true});
        const order = await getCart();
        this.setState({order: order});
        this.setState({areOrdersLoading: false});
    }

    async onOrderBuy() {
        try {
            await buyOrder();
            alert("Order bought!");
        } catch (e) {
            alert("Wrong credentials.");
        }
    }

    async onOrderDelete() {
        try {
            await deleteOrder();
            alert("Order deleted!");
        } catch (e) {
            alert("Wrong credentials.");
        }
    }

    render() {
        return (
            <form className="cart__wrapper" >
                <div className="cart__header">Cart:</div>
                <div className="cart-book-item-container">
                    <div className="item-title">Title</div>
                    <div className="item-qty">Qty</div>
                    <div className="item-price">Price</div>
                    </div>
                <div className="cart-item-wrapper">
                        {
                            this.state.order === null ? <div>Your cart is empty</div> :
                            this.state.order.items !== undefined && this.state.order.items.map((item) => (
                                <div className="cart-book-item-container">
                                    <div className="item-title">{item.title}</div>
                                    <div className="item-qry">{item.qty}</div>
                                    <div className="item-price">{item.price}</div>
                                </div>
                                ))
                        }
                </div>
                {<div className="cart__total">Sum: {this.state.order ===null? 0: this.state.order.tot_price}$</div>}
                <Button variant="secondary" type="submit" className="button button__secondary" onClick={this.onOrderBuy}>Buy</Button>
                <Button variant="light" type="button" className="cart__clear" onClick={this.onOrderDelete} >Delete</Button>

            </form>

        );
    }
}