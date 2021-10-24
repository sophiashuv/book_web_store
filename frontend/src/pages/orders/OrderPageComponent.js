import {Component} from 'react';

import './index.css';
import {getOrders} from "../../api/api";
import React from "react";


export default class OrderPageComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            areOrdersLoading: false,
            orders: [],
        };

        this.getAllOrders = this.getAllOrders.bind(this);
    }

    componentDidMount() {
        this.getAllOrders();
    }

    async getAllOrders(){
        this.setState({areOrdersLoading: true});
        const orders = await getOrders();
        console.log(orders);
        this.setState({orders: orders});
        this.setState({areOrdersLoading: false});
    }


    render() {
        return (
            <form className="cart__wrapper" >
                <div className="cart__header">Cart:</div>
                <div className="cart-book-item-container">
                    <div className="item-title">Titles</div>
                    <div className="item-price">Price</div>
                </div>
                <div className="cart-item-wrapper">
                    {
                        this.state.orders === null ? <div>Your orders is empty</div> :
                            this.state.orders !== undefined && this.state.orders.map((order) => (

                                <div className="cart-book-item-container">
                                    <div className="item-title">{order.items.map((item) => (
                                        item.title)).join(",")}</div>
                                    <div className="item-price">{order.tot_price}</div>
                                </div>))
                    }
                </div>
            </form>

        );
    }
}