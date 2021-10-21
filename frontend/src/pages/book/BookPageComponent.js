import {Component} from 'react';

import './index.css';
import {findBook, getBookAuthors} from "../../api/api";
import React from "react";
import { withRouter } from "react-router";
import {Link} from "react-router-dom";
import {Nav} from "react-bootstrap";

class BookPageComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            isBookLoading: false,
            book: {},
            areAuthorsLoading: false,
            authors: [],
        };

    }

    componentDidMount() {
        this.loadBook();
        this.loadAuthors();
    }


    async loadBook(){
        this.setState({isBookLoading: true});

        const product_id = this.props.match.params.productId
        const book = await findBook(product_id);
        this.setState({book: book});
        this.setState({isBookLoading: false});
    }

    async loadAuthors() {
        this.setState({areAuthorsLoading: true});
        const product_id = this.props.match.params.productId
        const authors = await getBookAuthors(product_id);
        this.setState({authors: authors});
        this.setState({areAuthorsLoading: false});
    }


    render() {

        // const history = useHistory();
        // const handleClick = () => history.push('/products');

            return (
            <>
                <div>
                    <div>
                        {this.state.isBookLoading && (<>Book is loading.....</>)}

                        {!this.state.isBookLoading && (
                            <div className="book-page-container">
                                <div className="button-container">
                                   {/*<button type="button" onClick={() => handleClick}>Back</button>*/}
                                    <Nav.Link >
                                        <Link to='/products'><div>Back</div></Link>
                                    </Nav.Link>
                                </div>
                                <div className="book-container">
                                    <div className="book-main-info-container">
                                        <div className="book-title">Title: {this.state.book.title}</div>
                                        <div className="book-genres">Genres: {this.state.book.genres}</div>

                                        <div className="book-authors">Authors: {this.state.authors.map(author =>(

                                            <Nav.Link>
                                                <Link to={`/authors/${author._id}`}>{author.name}</Link>
                                            </Nav.Link>
                                            )
                                        )}</div>

                                        {/*<div className="book-authors">Authors: {this.state.authors.map(author => author.name).join(", ")}</div>*/}
                                        <div className="book-pages">Pages: {this.state.book.pages}</div>
                                        <div className="book-publishing_house">Publishing house: {this.state.book.publishing_house}</div>
                                        <div className="book-year_published">Year published: {this.state.book.year_published}</div>
                                        <div className="book-description">Description: {this.state.book.description}</div>
                                        <div className="book-price">Price: {this.state.book.price}$</div>
                                    </div>
                                    <div className="book-img-wrapper">
                                        <img className="book-img" src={this.state.book.image_Url} alt=""/>
                                    </div>
                                </div>
                                <div className="button-container">
                                    <button type="button" onClick={()=>alert("Adding to cart")}>Add to cart</button>
                                </div>
                            </div>

                        )}
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(BookPageComponent);