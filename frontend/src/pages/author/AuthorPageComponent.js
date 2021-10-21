import {Component} from 'react';
import './index.css';
import {findAuthor} from "../../api/api";
import React from "react";
import {Link} from "react-router-dom";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";

class AuthorPageComponent extends Component {

    constructor(props){
        super(props);

        this.state = {
            isAuthorLoading: false,
            author: {},
        };

    }

    componentDidMount() {
        this.loadAuthor();
    }

    async loadAuthor(){
        this.setState({isAuthorLoading: true});
        // const author_id = this.props.match.params.authorId
        const author_id = "61704ed6c8d4e2fb5d5f230f"
        const author = await findAuthor(author_id);
        this.setState({author: author});
        this.setState({isAuthorLoading: false});
    }


    render() {
        return (
            <>
                <div>
                    <div>
                        {this.state.isBookLoading && (<>Book is loading.....</>)}
                        {!this.state.isBookLoading && (
                            <div className="book-page-container">
                                <div className="button-container">
                                    <Nav.Link >
                                        <Link to='/products'><div>Back</div></Link>
                                    </Nav.Link>
                                </div>
                                <div className="author-container">
                                    <div className="author-main-info-container">
                                        <div className={"author-name"}>{this.state.author.name}</div>
                                        <div >Year of birth: {this.state.author.date_of_birth}</div>
                                        <div >Biography: {this.state.author.biography}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(AuthorPageComponent);