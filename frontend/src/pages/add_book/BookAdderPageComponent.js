import { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "./index.css";
import { createBook } from "../../api/api";


export class BookAdderPageComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "title1",
            authors: "",
            genres: "",
            price: 0,
            pages: 0,
            publishing_house: "",
            year_published: 0,
            qty: 0,
            image_Url: "image1.jpg",
            description: "",
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onAuthorsChange = this.onAuthorsChange.bind(this);
        this.onGenresChange = this.onGenresChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.onPagesChange = this.onPagesChange.bind(this);

        this.onPublishing_houseChange = this.onPublishing_houseChange.bind(this);
        this.onYear_publishedChange = this.onYear_publishedChange.bind(this);
        this.onQtyChange = this.onQtyChange.bind(this);
        this.onImage_UrlChange = this.onImage_UrlChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);

        this.onAddBook = this.onAddBook.bind(this);
    }


    onTitleChange(e) {
        const { value } = e.target;
        this.setState({ title: value });
    }

    onAuthorsChange(e) {
        const { value } = e.target;
        this.setState({ authors: value.split(" ") });
    }

    onGenresChange(e) {
        const { value } = e.target;
        this.setState({ genres: value.split(" ") });
    }

    onPriceChange(e) {
        const { value } = e.target;
        this.setState({ price: value });
    }

    onPagesChange(e) {
        const { value } = e.target;
        this.setState({ pages: value });
    }

    onPublishing_houseChange(e) {
        const { value } = e.target;
        this.setState({ publishing_house: value });
    }

    onYear_publishedChange(e) {
        const { value } = e.target;
        this.setState({ year_published: value });
    }

    onQtyChange(e) {
        const { value } = e.target;
        this.setState({ qty: value });
    }

    onImage_UrlChange(e) {
        const { value } = e.target;
        this.setState({ image_Url: value });
    }

    onDescriptionChange(e) {
        const { value } = e.target;
        this.setState({ description: value });
    }

    async onAddBook() {
        const { title, authors, genres, price, pages, publishing_house, year_published, qty, image_Url, description } = this.state;

        this.setState({ isLoginLoading: true });
        try {
            await createBook({ title, authors, genres, price, pages, publishing_house, year_published, qty, image_Url, description });
            alert("Book created!");
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
                        <div className="adder-title">New Book</div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Book Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter book title"
                            value={this.state.title}
                            onChange={e => this.onTitleChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Genres</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter genres"
                            value={this.state.genres}
                            onChange={this.onGenresChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Image url</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter img_url"
                            value={this.state.image_Url}
                            onChange={this.onImage_UrlChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Authors</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter authors"
                            value={this.state.authors}
                            onChange={this.onAuthorsChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Pages</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter pages amount"
                            value={this.state.pages}
                            onChange={this.onPagesChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Publishing house</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter publishing house"
                            value={this.state.publishing_house}
                            onChange={this.onPublishing_houseChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Year published</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter year published"
                            value={this.state.year_published}
                            onChange={this.onYear_publishedChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter description"
                            value={this.state.description}
                            onChange={this.onDescriptionChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter price"
                            value={this.state.price}
                            onChange={this.onPriceChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter books amount"
                            value={this.state.qty}
                            onChange={this.onQtyChange}
                        />
                    </Form.Group>
                    <Button variant="primary"
                            type="submit"
                            onClick={this.onAddBook}>
                        Add book
                    </Button>
                </Form>
            </div>
        );
    }
}
