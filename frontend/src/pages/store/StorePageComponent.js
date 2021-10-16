import {Component} from 'react';
import Grid from '@mui/material/Grid';

import {BooksFiltersComponent} from "./filters/BooksFiltersComponent";

import './index.css';
import {findBooks} from "../../api/api";
import {BookItemComponent} from "./book-item/BookItemComponent";

export class StorePageComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            areBooksLoading: false,
            books: [],
        };

        this.searchBooks = this.searchBooks.bind(this);
    }

    componentDidMount() {
        this.searchBooks();
    }


    async searchBooks(filters = {}){
        this.setState({areBooksLoading: true});
        const books = await findBooks(filters);
        this.setState({books: books.books});
        this.setState({areBooksLoading: false});
        console.log(this.state.books);
    }

    render() {
        return (
            <>
                <div className="store-pate-container">
                    <BooksFiltersComponent onSearch={this.searchBooks}/>
                    <div className="books-card-container">

                        {this.state.areBooksLoading && (<>Books are loading.....</>)}

                        {!this.state.areBooksLoading &&

                                this.state.books.map(book => (
                                        <BookItemComponent key={book._id} book={book}/>
                                ))}

                    </div>
                </div>
            </>
        );
    }
}