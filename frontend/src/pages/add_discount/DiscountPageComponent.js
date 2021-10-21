import { Component } from "react";
import { Form, Button } from "react-bootstrap";
import {add_discount} from "../../api/api";
import "./index.css";

export class DiscountPageComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            genres: "",
            discount: ""
        };

        this.onGenresChange = this.onGenresChange.bind(this);
        this.onDiscountChange = this.onDiscountChange.bind(this);

        this.onAddDiscount = this.onAddDiscount.bind(this);
    }

    onGenresChange(e) {
        const { value } = e.target;
        this.setState({ genres: value.split(" ") });
    }

    onDiscountChange(e) {
        const { value } = e.target;
        this.setState({ discount: value });
    }

    async onAddDiscount() {
        const { genres, discount} = this.state;

        this.setState({ isLoginLoading: true });
        try {
            await add_discount( {genres, discount});
            alert("Discount added!");
        } catch (e) {
            console.log(e)
        } finally {
            this.setState({ isLoginLoading: false });
        }
    }

    render() {
        return (
            <div className="form-wrapper">
                <Form>
                    <Form.Group className="mb-3">
                        <div className="adder-title">Add discount</div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Genres</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter genres"
                            value={this.state.genres}
                            onChange={e => this.onGenresChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Discount</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter discount"
                            value={this.state.discount}
                            onChange={this.onDiscountChange}
                        />
                    </Form.Group>
                    <Button variant="primary"
                            type="submit"
                            onClick={this.onAddDiscount}>
                        Add discount
                    </Button>
                </Form>
            </div>
        );
    }
}