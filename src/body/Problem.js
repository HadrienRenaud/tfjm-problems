import React, {Component} from 'react';
import {Header, Container, Segment, Divider, List, Label, Placeholder} from 'semantic-ui-react'
import PropTypes from "prop-types";
import config from "../config";
import ErrorMessage from "../errors/ErrorMessage";
import PDFViewer from "./PDFViewer";

class Problem extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
    };

    constructor() {
        super();
        this.state = {
            loading: true,
            problem: {tags: []},
            hasError: false,
            error: null,
            pdf: {},
        }
    }

    componentDidMount() {
        let address = config.apiAdress + '/problem/' + this.props.match.params.id;
        console.log('Calling ' + address);
        fetch(address)
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
            .then(() => {
                fetch(address + '/pdf').then((result) => {
                    this.setState({
                        pdf: result,

                    })
                })
            })
    }

    render() {
        if (this.state.loading)
            return <Container>
                <Placeholder fluid>
                    <Placeholder.Header>
                        <Placeholder.Line length="long"/>
                    </Placeholder.Header>

                    <Placeholder.Paragraph>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                    </Placeholder.Paragraph>

                    <Placeholder.Image rectangular/>
                </Placeholder>

                <Segment padded='very'>
                    <Header as="h2">
                        {this.state.problem.name}
                    </Header>

                    {this.state.problem.description}

                    <Divider/>

                    <List horizontal>
                        {this.state.problem.tags.map(tag => (
                            <List.Item key={tag.id}>
                                <Label color="blue" basic>
                                    {tag.name}
                                </Label>
                            </List.Item>
                        ))}
                    </List>
                </Segment>
            </Container>

        return (
            <Container>
                {this.state.hasError && <ErrorMessage err={this.state.error}/>}

                <Segment padded='very'>
                    <Header as="h2">
                        {this.state.problem.name}
                    </Header>

                    {this.state.problem.description}

                    <Divider/>

                    <List horizontal>
                        {this.state.problem.tags.map(tag => (
                            <List.Item key={tag.id}>
                                <Label color="blue" basic>
                                    {tag.name}
                                </Label>
                            </List.Item>
                        ))}
                    </List>
                </Segment>

                {this.state.loading ? "" :
                    <PDFViewer url={config.apiAdress + '/problem/' + this.props.match.params.id}

                    />
                }

            </Container>
        )
    }
}

export default Problem;