import {Component} from 'react';

import './index.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import {addToCart} from "../../../api/api";

export class CartItemComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const item = this.props.item;

        return (
            <>
                {/*<div className="cart-book-item-container">*/}
                {/*        /!*<div className="book-item-title">{item.title}</div>*!/*/}
                {/*        <div className="book-item-qty">{item.qty}</div>*/}
                {/*        <div className="book-item-qty">{item.price}</div>*/}
                {/*</div>*/}
            </>
        );
    }
}