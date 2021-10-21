import {Container, Nav, Navbar} from "react-bootstrap";
import {Component} from "react";
import {Link} from "react-router-dom";
import {role} from "../../api/api";

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
                            <Link to="/sign_in">Sign in</Link>
                        </Nav.Link>
                        <Nav.Link >
                            <Link to="/cart">Cart</Link>
                        </Nav.Link>

                        {role === "Admin" && (
                            <Nav.Link >
                                <Link to="/add_book">Add Book</Link>
                            </Nav.Link>)}
                        {role === "Admin" && (
                            <Nav.Link >
                                <Link to="/add_author">Add Author</Link>
                            </Nav.Link>)}
                        {role === "Admin" && (
                            <Nav.Link >
                            <Link to="/add_discount">Add Discount</Link>

                        </Nav.Link>)}

                    </Nav>
                </Container>
            </Navbar>
        )
    }
}
