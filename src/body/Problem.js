import React, {Component} from 'react';
import {Header, Container} from 'semantic-ui-react'
import PropTypes from "prop-types";
import config from "../config";
import ErrorMessage from "../errors/ErrorMessage";

class Problem extends Component{
    static propTypes = {
        match: PropTypes.object.isRequired,
    }

    constructor() {
        super();
        this.state = {
            loading: true,
            problem: {},
            hasError: false,
            error: null,
        }
    }

    componentDidMount() {
        let adress = config.apiAdress + '/problem/' + this.props.match.params.id;
        console.log('Calling ' + adress);
        fetch(adress)
            .then(results => results.json())
            .then(data => {
                console.log("problem :", data);
                this.setState({
                    problem: data,
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
        console.log(this.state.problem);

        return (
            <Container>
                {this.state.hasError && <ErrorMessage err={this.state.error}/>}
                <Header>
                    {this.state.problem.name}
                </Header>

                {this.state.problem.description}

            </Container>
        )
    }
}

export default Problem;