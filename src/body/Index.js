import React, {Component} from 'react';
import {Container, Card, Segment} from "semantic-ui-react";
import ProbCard from "./ProbCard";
import config from "../config";
import ErrorMessage from "../errors/ErrorMessage";
import Filter from "./Filter";
import {Search} from "js-search";

function shouldBeDisplayed(pbTag, activeTags) {
    if (activeTags.length === 0)
        return true
    // détermine si l'intersection des deux est vide ou non
    return pbTag.filter(value => -1 !== activeTags.indexOf(value)).length > 0;
}

class Index extends Component {
    allProblems = [];
    search;

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

    onSearchChange(e, {value}) {
        this.setState({problems: this.search.search(value)})
    }

    filterUpdate(e, id) {
        if (this.state.activeTags.indexOf(id) === -1) {
            let tags = this.state.tags;
            tags[id].isTriggered = true;
            this.setState({
                tags: tags,
                activeTags: [id, ...this.state.activeTags],
            })
        } else {
            let tags = this.state.tags;
            tags[id].isTriggered = false;
            this.setState({
                tags: tags,
                activeTags: this.state.activeTags.filter(t => t !== id)})
        }
    }

    componentDidMount() {
        let address = config.apiAdress + '/index';
        console.log('Calling ' + address);
        fetch(address)
            .then(results => results.json())
            .then(data => {
                console.log("Answered from " + address + " received.");
                let tagsById = [];
                let probOrder = [];
                data.tags.map(tag => {
                    tag.isTriggered = false;
                    tagsById[tag.id] = tag;
                    probOrder.push(tag.id);
                    return 0;
                });
                this.allProblems = data.problems.filter(problem => !!problem);
                this.search.addDocuments(this.allProblems);
                this.setState({
                    probOrder: probOrder,
                    problems: this.allProblems,
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
            });
        this.search = new Search('id');
        this.search.addIndex('name');
        this.search.addIndex('description');
        this.search.addIndex('tags');
    }

    render() {
        var problems = [];

        if (this.state.problems.length === 0)
            problems = this.allProblems;
        else
            problems = this.state.problems;

        return (
            <Container>
                {this.state.hasError && <ErrorMessage err={this.state.error}/>}

                <Filter tags={this.state.tags}
                        onClick={this.filterUpdate.bind(this)}
                        onSearchChange={this.onSearchChange.bind(this)}
                />
                <Segment>
                    <Card.Group itemPerLine="3" centered>
                        {problems.map((problem) => {
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