import {Component} from 'react';

import './index.css';
import {findBook, findBooks, getBookAuthors} from "../../api/api";
import React from "react";
import { withRouter } from "react-router";
import {Link} from "react-router-dom";
import {Nav} from "react-bootstrap";
import {ListGroup,CloseButton, Button}  from 'react-bootstrap';

export default class CartPageComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            areOrdersLoading: false,
            orders: [],
        };

        this.searchBooks = this.searchBooks.bind(this);
    }

    componentDidMount() {
        this.searchBooks();
    }


    async getOrders(filters = {}){
        this.setState({areOrdersLoading: true});
        const books = await findBooks(filters);
        this.setState({orders: books.orders});
        this.setState({areOrdersLoading: false});
    }

    render() {
        return (
            <form className="cart__wrapper" >
                <div className="cart__header">Кошик:</div>
                <ul className="cart">
                    <ListGroup variant="flush">
                        {/*{renderCart(cartList)}*/}
                        hello
                    </ListGroup>
                    <div className="cart__total">Сума: 70$</div>
                </ul>
                <Button variant="secondary" type="submit" className="button button__secondary" >Замовити</Button>
                <Button variant="light" type="button" className="cart__clear" >Очистити</Button>

            </form>

        );
    }
}