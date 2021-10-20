import {Component} from "react";
import {Form, Button} from "react-bootstrap";
import './index.css';

export class AuthorAdderPageComponent extends Component {
    render() {
        return (
            <div className="form-wrapper">
                <Form>
                    <Form.Group className="mb-3">
                        <div className="adder-title">New Author</div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Author Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter author name" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Date of birth</Form.Label>
                        <Form.Control type="text" placeholder="Enter date of birth" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Biography</Form.Label>
                        <Form.Control type="text" placeholder="Enter biography" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add author
                    </Button>
                </Form>
            </div>
        );
    }
}