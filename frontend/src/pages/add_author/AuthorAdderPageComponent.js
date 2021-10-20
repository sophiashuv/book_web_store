import {Component} from "react";
import {Form, Button} from "react-bootstrap";
import './index.css';
import {createAuthor} from "../../api/api";

export class AuthorAdderPageComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            date_of_birth: "",
            biography: "",
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onDate_of_birthChange = this.onDate_of_birthChange.bind(this);
        this.onBiographyChange = this.onBiographyChange.bind(this);

        this.onAddAuthor = this.onAddAuthor.bind(this);
    }


    onNameChange(e) {
        const { value } = e.target;
        this.setState({ name: value });
    }

    onDate_of_birthChange(e) {
        const { value } = e.target;
        this.setState({ date_of_birth: value });
    }

    onBiographyChange(e) {
        const { value } = e.target;
        this.setState({ biography: value });
    }

    async onAddAuthor() {
        const { name, date_of_birth, biography} = this.state;

        this.setState({ isLoginLoading: true });
        try {
            await createAuthor({ name, date_of_birth, biography});
            alert("Author created!");
        } catch (e) {
            alert("Wrong credentials.");
        } finally {
            this.setState({ isLoginLoading: false });
        }
    }

    render() {
        return (
            <div className="form-wrapper">
                <Form>
                    <Form.Group className="mb-3">
                        <div className="adder-title">New Author</div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Author Name</Form.Label>
                        <Form.Control type="text"
                                      placeholder="Enter author name"
                                      value={this.state.name}
                                      onChange={this.onNameChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Date of birth</Form.Label>
                        <Form.Control type="text"
                                      placeholder="Enter date of birth"
                                      value={this.state.date_of_birth}
                                      onChange={this.onDate_of_birthChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Biography</Form.Label>
                        <Form.Control type="text"
                                      placeholder="Enter biography"
                                      value={this.state.biography}
                                      onChange={this.onBiographyChange}/>
                    </Form.Group>
                    <Button variant="primary"
                            type="submit"
                            onClick={this.onAddAuthor}>>
                        Add author
                    </Button>
                </Form>
            </div>
        );
    }
}