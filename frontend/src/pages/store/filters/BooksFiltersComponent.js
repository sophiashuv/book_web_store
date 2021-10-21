import {Component} from 'react';

import {Dropdown, Button, Form} from 'react-bootstrap';

import './index.css';

export class BooksFiltersComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
            genres: '',
            sort: '',
            offset: 0
        };

        this.onSearchTermChange = this.onSearchTermChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onGenreChange = this.onGenreChange.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
    }

    onSearchTermChange(e) {
        const {value} = e.target;
        this.setState({searchTerm: value});
    }

    onGenreChange(e) {
        const {value} = e.target;
        this.setState({genres: value});
    }

    onSortChange(e) {
        const {value} = e.target;
        this.setState({sort: value});
    }


    async onSearch() {
        const {searchTerm, genres, sort, offset} = this.state;

        await this.props.onSearch({
            searchTerm, genres, sort, offset
        });
    }

    render() {

        return (
            <div className="books-filters">
                <div className="genres-wrapper">
                    <Form.Select aria-label="Default select example" onChange={this.onGenreChange}>
                        <option value="">All Genres</option>
                        <option value="Functional Analysis">Functional Analysis</option>
                        <option value="Math">Math</option>
                        <option value="Physics">Physics</option>
                        <option value="Geometry">Geometry</option>
                    </Form.Select>

                    <Form.Select aria-label="Default select example" onChange={this.onSortChange}>
                        <option value="title">Title</option>
                        <option value="pages">pages</option>
                    </Form.Select>
                </div>
                <div className="search-wrapper">
                    <input
                        type="text"
                        placeholder="Search value here..."
                        value={this.state.searchTerm}
                        onChange={this.onSearchTermChange}
                    />
                    <Button variant="dark" onClick={this.onSearch}>Search</Button>
                </div>
            </div>
        );
    }
}