import {Component} from 'react';

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';

import {Dropdown, Button} from 'react-bootstrap';

import './index.css';

export class BooksFiltersComponent extends Component {

    render() {

        return (
            <div className="books-filters">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Genre
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item>Horror</Dropdown.Item>
                        <Dropdown.Item>Fantasy</Dropdown.Item>
                        <Dropdown.Item>Math</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <div className="search-wrapper">
                    <input type="text" placeholder="Search value here..."/>
                    <Button variant="dark">Search</Button>
                </div>
            </div>
        );
    }
}