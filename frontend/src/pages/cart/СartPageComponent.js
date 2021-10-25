import {Component} from 'react';

import './index.css';
import {buyOrder, deleteOrder,getCart} from "../../api/api";
import React from "react";
import {Button}  from 'react-bootstrap';

export default class CartPageComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            areOrdersLoading: false,
            order: [],
        };

        this.getOrders = this.getOrders.bind(this);
        this.onOrderBuy = this.onOrderBuy.bind(this);
        this.onOrderDelete = this.onOrderDelete.bind(this);
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
            this.getOrders();
        } catch (e) {
            console.log(e);
            alert("Wrong credentials.");
        }
    }

    async onOrderDelete() {
        try {
            await deleteOrder();
            alert("Order deleted!");
            await this.getOrders();
        } catch (e) {
            alert("Wrong credentials.");
        }
    }

    render() {
        return (
            <>
                <div className="cart__header">Cart:</div>
                <div className="cart-book-item-container">
                    <div className="item-title">Title</div>
                    <div className="item-qty">Qty</div>
                    <div className="item-price">Price</div>
                    </div>
                <div className="cart-item-wrapper">
                        {
                            this.state.order === null ? <div>Your cart is empty</div> :
                            this.state.order.items !== undefined && this.state.order.items.map((item, index) => (
                                <div key={index} className="cart-book-item-container">
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

            </>

        );
    }
}