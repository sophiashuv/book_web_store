import {Component} from 'react';

import './index.css';

export class BookItemComponent extends Component {

    render() {
        const book = this.props.book;
        return (
            <>
                <div className="book-item-container">
                    <span className="book-item-title">
                    {book.title}
                    </span>
                    <span className="book-item-author">
                    {book.author}
                    </span>
                </div>
            </>
        );
    }
}