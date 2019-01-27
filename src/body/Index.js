import React, {Component} from 'react';
import {Header, Container, Card, Grid, Image, Sticky, Segment} from "semantic-ui-react";
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

const fuseOptions = {
    id: 'id',
    keys: [{
        name: 'name',
        weight: 0.7,
    }, {
        name: 'description',
        weight: 0.3,
    }]
};

class Index extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            problems: [],
            tags: [],
            hasError: false,
            error: null,
            activeTags: [],
            probOrder: [],
        };
    }

    filterUpdate(e, id) {
        if (this.state.activeTags.indexOf(id) === -1) {
            this.state.tags[id].isTriggered = true;
            this.setState({activeTags: [id, ...this.state.activeTags]})
        } else {
            this.state.tags[id].isTriggered = false;
            this.setState({activeTags: this.state.activeTags.filter(t => t !== id)})
        }
    }

    onUpdateChange(e, {value}) {

    }

    componentDidMount() {
        let address = config.apiAdress + '/index';
        console.log('Calling ' + address);
        fetch(address)
            .then(results => results.json())
            .then(data => {
                console.log("Answered from " + address + " received.");
                let tagsById = [];
                this.state.probOrder = [];
                data.tags.map(tag => {
                    tag.isTriggered = false;
                    tagsById[tag.id] = tag;
                    this.state.probOrder.push(tag.id);
                    return 0;
                });
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

                <Filter tags={this.state.tags} onClick={this.filterUpdate.bind(this)}/>
                <Segment>
                    <Card.Group itemPerLine="3" centered>
                        {this.state.problems.map((problem) => {
                            if (problem && shouldBeDisplayed(problem.tags.map(t => t.id), this.state.activeTags))
                                return <ProbCard problem={problem} key={problem.id}/>;
                            else return ""
                        })}
                    </Card.Group>
                </Segment>
            </Container>
        )
    }
}

export default Index;