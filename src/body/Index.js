import React, {Component} from 'react';
import {Header, Container, Card, Grid} from "semantic-ui-react";
import ProbCard from "./ProbCard";
import config from "../config";
import ErrorMessage from "../errors/ErrorMessage";
import Filter from "./Filter";

function shouldBeDisplayed(pbTag, activeTags) {
    if (activeTags.length === 0)
        return true
    // détermine si l'intersection des deux est vide ou non
    return pbTag.filter(value => -1 !== activeTags.indexOf(value)).length > 0;
}

class Index extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            problems: [],
            tags: [],
            hasError: false,
            error: null,
            activeTags: []
        }
    }

    filterUpdate(e, id) {
        if (this.state.activeTags.indexOf(id) === -1)
            this.setState({ activeTags: [id, ...this.state.activeTags] })
        else
            this.setState({ activeTags: this.state.activeTags.filter(t => t !== id)})
    }

    componentDidMount() {
        let address = config.apiAdress + '/index';
        console.log('Calling ' + address);
        fetch(address)
            .then(results => results.json())
            .then(data => {
                console.log("Answered from " + address + " received.");
                let tagsById = [];
                data.tags.map(tag => {tag.isTriggered = false; tagsById[tag.id] = tag; return 0;});
                this.setState({
                    problems: data.problems,
                    tags: tagsById,
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
        console.log('activeState', this.state.activeTags);

        return (
            <Container>
                {this.state.hasError && <ErrorMessage err={this.state.error}/>}

                <Header as="h2">
                    Index
                </Header>

                <Grid columns={5}>
                    <Grid.Column>
                        <Filter tags={this.state.tags} onClick={this.filterUpdate.bind(this)}/>
                    </Grid.Column>

                    <Grid.Column width="4">
                        <Container>
                            <Card.Group>
                                {this.state.problems.map((problem) => {
                                    if (problem && shouldBeDisplayed(problem.tags.map(t => t.id), this.state.activeTags))
                                        return <ProbCard problem={problem} key={problem.id}/>;
                                    else return ""
                                })}
                            </Card.Group>
                        </Container>
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}

export default Index;