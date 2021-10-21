import {Component} from 'react';

import './index.css';
import {addToCart, buyOrder, findBook, findBooks, getBookAuthors, getCart} from "../../api/api";
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
                    <div>Title</div>
                    <div>Qty</div>
                    <div>Price</div>
                    </div>
                <div>

                    {this.state.areOrdersLoading && (<>Books are loading.....</>)}
                       {/*{this.state.areOrdersLoading && !this.state.order.items === undefined &&*/}
                       {/*{console.log(this.state.order.items)}*/}
                    {/*{this.state.order.items.map(() => (console.log("----")))}*/}
                    {/*{this.state.order.items.map((item) =>(*/}
                    {/*        <div>{item.title}</div>*/}
                    {/*    // <div>{item.qty}</div>*/}
                    {/*    // <div>{item.price}</div>*/}
                    {/*))*/}
                    {/*}*/}
                </div>
                {<div className="cart__total">Sum: {this.state.order.tot_price}$</div>}
                <Button variant="secondary" type="submit" className="button button__secondary" onClick={this.onOrderBuy}>Buy</Button>
                <Button variant="light" type="button" className="cart__clear" onClick={this.onOrderBuy} >Delete</Button>

            </form>

        );
    }
}