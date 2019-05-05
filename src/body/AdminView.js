import React, {Component} from 'react';
import {
    Header,
    Container,
    Placeholder,
    Form,
    Message,
    Table,
    Button,
    Image,
    Label,
    Dropdown,
    Menu,
    Segment,
} from 'semantic-ui-react'
import config from "../config";
import {Link, Switch, Route} from "react-router-dom";
import PropTypes from "prop-types";
import ErrorMessage from "../errors/ErrorMessage";
import FormProblem from './FormProblem';

function raccourcisseur(string, length = 50) {
    if (string.length < length)
        return string;
    else
        return string.substring(0, 47) + "..."
}

class AddTag extends Component {
    static propTypes = {
        onAddedTag: PropTypes.func,
        existingTags: PropTypes.arrayOf(PropTypes.string)
    };

    state = {
        loading: false,
        hasError: false,
        error: null,
        currentName: "",
        isAlreadyDone: false,
    };

    handleChange(e) {
        let value = e.target.value;
        this.setState({
            currentName: value,
            isAlreadyDone: !(this.props.existingTags.indexOf(value) === -1),
        })
    }

    handleSubmit(e) {
        console.log("Creating tag ........ ")
    }

    render() {
        return <Form onSubmit={this.handleSubmit()}>
            <Form.Input inline
                        loading={this.state.loading}
                        error={this.state.isAlreadyDone}
            >
                <input value={this.state.currentName} onChange={this.handleChange.bind(this)}
                       placeholder="Ajouter un tag"/>
                {this.state.isAlreadyDone ?
                    <Label basic color='red' pointing="left"
                           content="Un tag avec le même nom existe déjà"/>
                    :
                    <Button type="submit" content="Ajouter" attached
                            disabled={this.state.currentName.length === 0}
                            onClick={this.handleSubmit.bind(this)}/>
                }
            </Form.Input>
        </Form>
    }
}

class AdminProblem extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
    };

    state = {
        loading: true,
        problem: {tags: []},
        hasError: false,
        error: null,
    };

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
    }

    addTag(tag) {
        let problem = this.state.problem;
        problem.tags.push(tag);
        this.setState({problem: problem});
    }

    removeTag(tagId) {
        let problem = this.state.problem;
        problem.tags = problem.tags.filter(tag => tag.id !== tagId)
        this.setState({problem: problem});
    }

    render() {
        if (this.state.loading)
            return <Container>
                <Message info content="Chargement en cours ..."/>
            </Container>;

        if (this.state.hasError)
            return <Container>
                <ErrorMessage err={this.state.error}/>
            </Container>;

        return (
            <FormProblem pb={this.state.problem} removeTag={this.removeTag.bind(this)} addTag={this.addTag.bind(this)}/>
        )
    }
}

class AdminView extends Component {

    state = {
        showProblem: true,
        loading: true,
        hasError: false,
        problems: [],
        tags: [{id: 0, name: "Coucou"}, {id: 1, name: "Bonjour"}]
    };

    switchView() {
        this.setState({showProblem: !this.state.showProblem})
    }

    componentDidMount() {
        let address = config.apiAdress + '/index';
        console.log('Calling ' + address);
        fetch(address)
            .then(results => results.json())
            .then(data => {
                console.log("Answered from " + address + " received.");
                this.setState({
                    problems: data.problems.filter(pb => !!pb),
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
    }

    handleDelete(id) {
        let address = config.apiAdress + "/problem/" + id;
        console.log("DELETE to " + address);
        fetch(address, {
            credentials: "include",
            method: "DELETE",
            mode: "cors",
        })
            .then(results => {
                if (results.ok)
                    this.setState({
                        problems: this.state.problems.filter(pb => pb.id !== id),
                    });
                else
                    console.error(results);
            })
    }

    render() {
        return <Container>
            <Header as="h1" content="Panneau d'administration"/>


            <Menu secondary attached='top' pointing>
                <Menu.Item name="Problems"
                           active={this.state.showProblem}
                           onClick={this.switchView.bind(this)}
                />
                <Menu.Item name="Tags"
                           onClick={this.switchView.bind(this)}
                           active={!this.state.showProblem}
                />
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Button icon="plus" labelPosition="left" content="Nouveau problème" color="green" as={Link}
                                to="/admin/new"/>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>

            {this.state.showProblem ?
                <Table attached>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Nom</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Image</Table.HeaderCell>
                            <Table.HeaderCell>Tags</Table.HeaderCell>
                            <Table.HeaderCell>Downloads</Table.HeaderCell>
                            <Table.HeaderCell>Edit</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.problems.map(pb => (
                            <Table.Row key={pb.id}>
                                <Table.Cell>{pb.id}</Table.Cell>
                                <Table.Cell>{pb.name}</Table.Cell>
                                <Table.Cell>{pb.description ? raccourcisseur(pb.description) : ""}</Table.Cell>
                                <Table.Cell>
                                    <Image size="tiny" rounded src={config.apiAdress + '/problem/' + pb.id + "/image"}/>
                                </Table.Cell>
                                <Table.Cell>
                                    <Label.Group size="small">
                                        {pb.tags.map(tag => (
                                            <Label content={tag.name} icon="tag" key={tag.id}/>
                                        ))}
                                    </Label.Group>
                                </Table.Cell>
                                <Table.Cell>
                                    <Dropdown text="Download">
                                        <Dropdown.Menu>
                                            <Dropdown.Item text="PDF" as="a"
                                                           href={config.apiAdress + '/problem/' + pb.id + '.pdf'}/>
                                            <Dropdown.Item text="tex" as="a"
                                                           href={config.apiAdress + '/problem/' + pb.id + '.tex'}/>
                                            <Dropdown.Item text="medias" as="a"
                                                           href={config.apiAdress + '/problem/' + pb.id + '.zip'}/>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button.Group icon>
                                        <Button icon="edit" as={Link} color="orange"
                                                to={"/admin/problem/" + pb.id}/>
                                        <Button icon="delete" color="red"
                                                onClick={() => this.handleDelete(pb.id)}/>
                                    </Button.Group>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                :
                <div>
                    <Segment attached>
                        <Label.Group color="yellow">
                            {this.state.tags.map(tag =>
                                <Label key={tag.id} icon="remove" onClick={() => this.removeTag(tag.id)}
                                       content={tag.name}/>
                            )}
                        </Label.Group>
                    </Segment>
                    <Segment attached>
                        <AddTag existingTags={this.state.tags.map(tag => tag.name)}/>
                    </Segment>
                </div>
            }
        </Container>
    }
}

class LoginForm extends Component {
    state = {
        loading: false,
        hasError: false,
        username: "",
        password: "",
    };

    onChangeUsername(e) {
        this.setState({username: e.target.value})
    }

    onChangePassword(e) {
        this.setState({password: e.target.value})
    }

    submit(e) {
        let address = config.apiAdress + "/login";
        console.log("Post to " + address);
        fetch(address, {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            method: 'POST',
            body: new URLSearchParams({username: this.state.username, password: this.state.password}),
            credentials: "include",
            mode: "cors",
        })
            .then(result => {
                    if (result.status === 200) {
                        console.log(result);
                        this.props.onLoggedIn();
                    }
                    else {
                        console.log("Login failed with response :", result);
                        this.setState({
                            hasError: true,
                            error: result.status === 401 ? "Mauvais login/password." : result.statusText
                        });
                    }
                }
            )
    }

    render() {
        return <Container>
            <Form loading={this.state.loading} error={this.state.hasError} onSubmit={this.submit.bind(this)}>
                <Header content="Login to admin"/>
                <Form.Field>
                    <label>Username</label>
                    <input placeholder='Username' onChange={this.onChangeUsername.bind(this)}/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input placeholder='Password' type="password" onChange={this.onChangePassword.bind(this)}/>
                </Form.Field>
                <Message error content={this.state.error}/>
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    }
}

class LoginRouter extends Component {

    state = {
        loading: true,
        loggedIn: false,
    };

    onLoggedIn() {
        this.setState({loggedIn: true})
    }

    componentDidMount() {
        let address = config.apiAdress + '/login';
        console.log('Calling ' + address);
        fetch(address, {credentials: "include", mode: "cors"})
            .then(result => {
                if (result.status === 200)
                    this.setState({loading: false, loggedIn: true});
                else
                    this.setState({loading: false, loggedIn: false});
                return result
            })
            .catch(err => {
                this.setState({loading: false});
                console.log("User not loggedIn. error for reference :", err)
            })
    }

    render() {
        if (this.state.loading)
            return <Container>
                <Placeholder>
                    <Placeholder.Header>
                        <Placeholder.Line length="long"/>
                    </Placeholder.Header>

                    <Placeholder.Paragraph>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                    </Placeholder.Paragraph>
                </Placeholder>
            </Container>;

        return (
            <Container>
                {this.state.loggedIn ?
                    <Switch>
                        <Route path={"/admin/problem/:id"} component={AdminProblem}/>
                        <Route path={"/admin/new"} component={FormProblem}/>
                        <Route path={"/admin/"} component={AdminView}/>
                    </Switch>
                    :
                    <LoginForm onLoggedIn={this.onLoggedIn.bind(this)}/>
                }
            </Container>
        )
    }
}

export default LoginRouter;