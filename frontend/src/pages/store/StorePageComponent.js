import {Component} from 'react';
import Grid from '@mui/material/Grid';

import {BooksFiltersComponent} from "./filters/BooksFiltersComponent";

import './index.css';
import {findBooks} from "../../api/api";
import {BookItemComponent} from "./book-item/BookItemComponent";

export class StorePageComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            areBooksLoading: false,
            books: [],
            next: false,
            Page: 0,
            PrevY: 0,
            searchTerm: '',
            genres: '',
            sort: ''
        };

        this.searchBooks = this.searchBooks.bind(this);
        this.onGenreChange = this.onGenreChange.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        this.onSearchTermChange = this.onSearchTermChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    componentDidMount() {
        this.searchBooks();

        const options = {
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

    handleObserver(entities) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.PrevY > y) {
            if (this.state.next != false) {
                let curPage = this.state.Page + 8;
                this.setState({Page: curPage});
                this.searchBooks();
            }
        }
        this.setState({PrevY: y});
    }

    async searchBooks() {
        const {Page, searchTerm, genres, sort} = this.state;
        this.setState({areBooksLoading: true});
        const filters = {
            offset: Page,
            searchTerm,
            genres,
            sort
        }
        const data = await findBooks(filters);
        this.setState({books: [...this.state.books, ...data.books]})

        this.setState({next: data.next});
        this.setState({areBooksLoading: false});
    }

    onGenreChange(genres){
        this.setState({genres})
    }

    onSortChange(sort){
        this.setState({sort})
    }

    onSearchTermChange(searchTerm){
        this.setState({searchTerm})
    }

    onSearch(){
        this.setState({
            Page: 0,
            books: [],
            PrevY: 0,
        })
        this.searchBooks();
    }

    render() {

        const loadingTextCSS = {display: this.state.Loading ? "block" : "none"};

        return (
            <>
                <div className="store-pate-container">
                    <BooksFiltersComponent
                    genres={this.state.genres}
                    searchTerm={this.state.searchTerm}
                    sort={this.state.sort}
                    onGenreChange={this.onGenreChange}
                    onSortChange={this.onSortChange}
                    onSearchTermChange={this.onSearchTermChange}
                    onSearch={this.onSearch}
                    />
                    <div className="books-card-container">
                        {this.state.books.map(book => (
                            <BookItemComponent key={book._id} book={book}/>
                        ))}
                    </div>
                    <div
                        ref={(loadingRef) => (this.loadingRef = loadingRef)}
                        className="loadingBlock">
                        <span style={loadingTextCSS}>Loading...</span>
                    </div>
                </div>

            </>
        );
    }
}