import {Component} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';

import './index.css';

export class BooksFiltersComponent extends Component {

    render() {

        return (
            <div className="books-filters">
                <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" spacing={2}>
                        <TextField id="outlined-basic" label="Book name" variant="outlined"/>
                        <div>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={10}
                                    label="Genre"
                                    onChange={() => {
                                    }}
                                >
                                    <MenuItem value="Horror">Horror</MenuItem>
                                    <MenuItem value="Fantasy">Fantasy</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained">Search</Button>
                    </Stack>
                </Stack>
            </div>
        );
    }
}