import {Component} from "react";
import {Form, Button} from "react-bootstrap";
import './index.css';
import {role, signin} from "../../api/api";
import history from "../../history";
import {AuthContext} from "../../authContext";

export class SignInPageComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isLoginLoading: false,
        };

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPassChange = this.onPassChange.bind(this);
        this.onSignin = this.onSignin.bind(this);
    }

    onEmailChange(e) {
        const {value} = e.target;
        this.setState({email: value});
    }

    onPassChange(e) {
        const {value} = e.target;
        this.setState({password: value});
    }

    async onSignin() {
        this.setState({isLoginLoading: true});
        const {email, password} = this.state;
        try {
            await signin(email, password);
            this.context.setRole(role);

            history.push("/products")
        } catch (e) {
            alert('Wrong credentials.');
        } finally {
            this.setState({isLoginLoading: false});
        }
    }

    render() {
        return (
            <div className="form-wrapper">
                <Form>
                    <Form.Group className="mb-3">
                        <div className="sign-in-title">Sign in</div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={this.onEmailChange}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.onPassChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out"/>
                    </Form.Group>
                    <Button variant="primary" onClick={this.onSignin}>
                        {this.state.isLoginLoading ? 'Loading....' : 'Sign in'}
                    </Button>
                </Form>
            </div>
        );
    }
}

SignInPageComponent.contextType = AuthContext;