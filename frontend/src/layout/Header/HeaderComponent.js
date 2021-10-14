import {Container, Nav, Navbar} from "react-bootstrap";
import {Component} from "react";
import {Link} from "react-router-dom";

export class HeaderComponent extends Component {
    render() {
        return (
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand ><Link to="/products">MathBookShop</Link></Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link >
                            <Link to="/home">Home</Link>
                        </Nav.Link>
                        <Nav.Link >
                            <Link to="/register">Register</Link>
                        </Nav.Link>
                        <Nav.Link >
                            <Link to="/log_up">Log up</Link>
                        </Nav.Link>
                        <Nav.Link >
                            <Link to="/cart">Cart</Link>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}
