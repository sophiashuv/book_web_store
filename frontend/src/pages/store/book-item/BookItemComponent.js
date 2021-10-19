import {Component} from 'react';

import './index.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import {addToCart} from "../../../api/api";

export class BookItemComponent extends Component {


    render() {
        const book = this.props.book;
        return (
            <>
                <div className="book-item-container">
                    <div className="book-item-main-info">
                        <Nav.Link >
                            <Link to={`/products/${book._id}`}><div className="book-item-title">{book.title}</div></Link>
                        </Nav.Link>
                    </div>
                    <div className="book-item-img-wrapper">
                        <img className="book-item-img" src={book.image_Url || "../assets/not_loaded.jpg"} alt="book photo"/>

                    </div>
                    <div className="book-item-navigation">
                        <div className="book-item-price">{book.price} $</div>
                        <button type="button" onClick={()=>addToCart(book.id)}>Add to cart</button>
                    </div>
                </div>
            </>
        );
    }


}