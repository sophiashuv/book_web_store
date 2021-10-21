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
            next: false,
            Page: 0,
            PrevY: 0,
        };

        this.searchBooks = this.searchBooks.bind(this);
    }

    componentDidMount() {
        this.searchBooks();

        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
        };

        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        );
        this.observer.observe(this.loadingRef);
    }

    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.PrevY > y) {
            console.log(this.state.next)
            if (this.state.next != false) {
                let curPage = this.state.Page + 8;

                this.searchBooks({offset: curPage});
                this.setState({ Page: curPage });
            } else {
            }
        }
        this.setState({ PrevY: y });
    }

    async searchBooks(filters = {offset: 0 }){
        this.setState({areBooksLoading: true});
        const data = await findBooks(filters);
        if (filters.offset === 0){
            this.setState({books: data.books});
        }
        else {
            let ff = this.state.books.concat(data.books)
            this.setState({books: ff});
        }

        // this.setState({books: data.books});
        this.setState({next: data.next});
        this.setState({areBooksLoading: false});
    }

    render() {
        const loadingCSS = {
            height: "100px",
            margin: "30px",
        };

        const loadingTextCSS = { display: this.state.Loading ? "block" : "none" };

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
                    <div
                        ref={(loadingRef) => (this.loadingRef = loadingRef)}
                        style={loadingCSS}>
                        <span style={loadingTextCSS}>Loading...</span>
                    </div>
                </div>

            </>
        );
    }
}