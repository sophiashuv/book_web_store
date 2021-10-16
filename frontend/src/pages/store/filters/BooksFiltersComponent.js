import {Component} from 'react';

import {Dropdown, Button, Form} from 'react-bootstrap';

import './index.css';
import {signin} from "../../../api/api";

export class BooksFiltersComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
            genres: '',
        };

        this.onSearchTermChange = this.onSearchTermChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onGenreChange = this.onGenreChange.bind(this);
    }

    onSearchTermChange(e) {
        const {value} = e.target;
        this.setState({searchTerm: value});
    }

    onGenreChange(e) {
        const {value} = e.target;
        this.setState({genres: value});
    }

    async onSearch() {
        const {searchTerm, genres} = this.state;
        await this.props.onSearch({
            searchTerm, genres,
        });
    }

    render() {

        return (
            <div className="books-filters">
                <div className="genres-wrapper">
                    <Form.Select aria-label="Default select example" onChange={this.onGenreChange}>
                        <option value="">Open this select menu</option>
                        <option value="Horror">Horror</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Math">Math</option>
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