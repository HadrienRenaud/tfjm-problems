import React, {Component} from 'react';
import {Header, Container, Card} from "semantic-ui-react";
import ProbCard from "./ProbCard";
import config from "../config";
import ErrorMessage from "../errors/ErrorMessage";

class Index extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            problems: [],
            hasError: false,
            error: null,
        }
    }

    componentDidMount() {
        let adress = config.apiAdress + '/index';
        console.log('Calling ' + adress);
        fetch(adress)
            .then(results => results.json())
            .then(data => {
                console.log(data);
                this.setState({
                    problems: data,
                    loading: false,
                })
            })
            .catch(err => {
                console.error(err);
                this.setState({
                    hasError: true,
                    error: err,
                    loading: false,
                })
            })
    }

    render() {
        return (
            <Container>
                {this.state.hasError && <ErrorMessage err={this.state.error}/>}
                <Header>
                    Index
                </Header>

                <Card.Group>
                    {this.state.problems.map((problem) => {
                        if (problem) return <ProbCard problem={problem} key={problem.id}/>
                        else return ""
                    })}
                </Card.Group>
            </Container>
        )
    }
}

export default Index;