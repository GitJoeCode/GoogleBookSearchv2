import React, { Component } from "react";
import API from "../utilities/API";
import Jumbotron from "../components/Jumbotron";
import { Container, Row, Col } from "../components/Grid";
import SearchForm from "../components/SearchForm";
import SearchResult from "../components/SearchResult"


class SearchBooks extends Component {
    //create state
    state = {
        search: "",
        books: [],
        error: "",
        message: ""
    };

    //function to take value of what enter in the search bar
    handleInputChange = event => {
        this.setState({ search: event.target.value })
    }

    //define function that looks like the getData on webpage

    //function to control the submit button of the search form 
    handleFormSubmit = event => {
        console.log('working');
        event.preventDefault();

        // once it clicks it connects to the google book api with the search value
        API.getGoogleSearchBooks(this.state.search)
            .then(res => {
                console.log('take1', res.data.items);
                if (res.data.items === "error") {
                    throw new Error(res.data.items);
                }
                else {    
                    // store response in a array
                    let results = res.data.items;
                    let books = [];
                    let result;
                    for(let i = 0; i<results.length; i++) {
                        result = results[i];
                        try{
                            books.push({
                                key: result.id,
                                id: result.id,
                                title: result.volumeInfo.title,
                                author: result.volumeInfo.authors,
                                description: result.volumeInfo.description,
                                image: result.volumeInfo.imageLinks.thumbnail,
                                link: result.volumeInfo.infoLink
                            });
                        }catch(e) {
                            console.log(e);
                        }
                    }
                    //map through the array 
                    // books = results.map(result => {
                    //     //store each book information in a new object 
                    //     // return result;
                    // });
                    console.log('books: ', books);
                    // reset the sate of the empty books array to the new arrays of objects with properties geting back from the response
                    this.setState({ books: books, error: "" });
                    console.log('results: ', this.state.books);
                }
            })
            .catch(err => this.setState({ error: err.items }));
    }

    handleSavedButton = event => {
        // console.log(event)
        event.preventDefault();
        console.log(this.state.books)
        let saveThisBook = this.state.books.filter(book => book.id === event.target.id)
        const savedBooks = saveThisBook[0];
        API.saveBook(savedBooks)
            .then(this.setState({ message: alert("Your book is saved") }))
            .catch(err => console.log(err))
    }
    render() {
        return (
            <Container fluid>
                <Jumbotron>
                    <h1 className="text-white">Find Your Favorite Books with GoogleBook API</h1>
                </Jumbotron>
                <Container>
                    <Row>
                        <Col size="12">
                            <SearchForm
                                handleFormSubmit={this.handleFormSubmit}
                                handleInputChange={this.handleInputChange}
                            />
                        </Col>
                    </Row>
                </Container>
                <br></br>
                <Container>
                    <SearchResult books={this.state.books} handleSavedButton={this.handleSavedButton} />
                </Container>
            </Container>
        )
    }


}

export default SearchBooks