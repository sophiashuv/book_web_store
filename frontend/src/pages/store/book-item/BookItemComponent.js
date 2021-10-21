import {Component} from 'react';

import './index.css';
import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import {addToCart} from "../../../api/api";

export class BookItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginLoading: false
        };
        this.onAddBookToCart = this.onAddBookToCart.bind(this);
    }

    async onAddBookToCart() {
        const book_id = this.props.book._id;
        this.setState({ isLoginLoading: true });
        try {
            await addToCart(book_id);
            alert("Book added!");
        } catch (e) {
            alert("Wrong credentials.");
        } finally {
            this.setState({ isLoginLoading: false });
        }
    }

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
                        <button type="button" onClick={this.onAddBookToCart}>Add to cart</button>
                    </div>
                </div>
            </>
        );
    }
}