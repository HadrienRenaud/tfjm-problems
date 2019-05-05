import React, {Component} from "react";
import config from "../config";
import PropTypes from "prop-types";
import {
    Header,
    Container,
    Form,
    Message,
    Button,
    Image,
    Label,
    Segment,
    TransitionablePortal,
    Divider, Dropdown, Menu
} from 'semantic-ui-react'
import {Link, Redirect} from "react-router-dom";

class AddTag extends Component {
    static propTypes = {
        tags: PropTypes.arrayOf(PropTypes.object).isRequired,
        probId: PropTypes.number.isRequired,
        addTag: PropTypes.func.isRequired,
        removeTag: PropTypes.func.isRequired,
    };

    state = {
        loading: true,
        tags: [],
        error: null,
        hasError: false,
        selectedTag: null,
        creatingTag: "",
    };

    addTag(tag) {
        let address = config.apiAdress + "/problem/" + this.props.probId + "/tag";
        console.log("PUT to " + address + " with", tag);
        fetch(address, {
            credentials: "include",
            method: "PUT",
            mode: "cors",
            body: JSON.stringify(tag),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(result => result.json())
            .then(result => {
                console.log("This is what adding tag gives us back :", result);
                this.props.addTag(result);
                this.setState({loading: false})
            });
        this.setState({loading: true, selectedTag: null, creatingTag: ""});
    }

    removeTag(tagId) {
        let address = config.apiAdress + "/problem/" + this.props.probId + "/tag/" + tagId;
        console.log("Calling DELETE ", address);
        fetch(address, {
            credentials: "include",
            method: "DELETE",
            mode: "cors",
        })
            .then(result => {
                    if (result.status === 204) {
                        if (this.props.removeTag)
                            this.props.removeTag(tagId)
                    }
                }
            )
    }

    componentDidMount() {
        let address = config.apiAdress + "/tags";
        console.log("GET to " + address);
        fetch(address)
            .then(result => result.json())
            .then(tags => {
                this.setState({tags: tags, loading: false})
            })
    }

    render() {
        let tagIds = this.props.tags.map(tag => tag.id);

        return <Segment vertical>
            <Header content="Modification des tags"/>

            <Header as="h4" content="Tags ajoutés"/>

            <Label.Group color="yellow">
                {this.props.tags.map(tag =>
                    <Label key={tag.id} icon="remove" onClick={() => this.removeTag(tag.id)}
                           content={tag.name}/>
                )}
            </Label.Group>

            <Header as="h4" content="Ajouter des tags existants"/>

            <Form>
                <Dropdown
                    selection search value={this.state.selectedTag}
                    options={this.state.tags
                        .filter(tag => tagIds.indexOf(tag.id) === -1)
                        .map(tag => ({key: tag.id, text: tag.name, value: tag.id}))}
                    placeholder="Add tags"
                    loading={this.state.loading}
                    disabled={this.state.loading}
                    onChange={(e, {value}) => this.setState({selectedTag: value})}
                />
                <Button
                    onClick={() => this.addTag({id: this.state.selectedTag})}
                    disabled={this.state.loading}
                    content="Add tag"
                />
            </Form>

            <Header as="h4" content="Créer un nouveau tag et l'ajouter"/>
            <Form onSubmit={() => this.addTag({name: this.state.creatingTag})}>
                <Form.Input value={this.state.creatingTag}
                            onChange={(e, {value}) => this.setState({creatingTag: value})}
                            placeholder="Taper ici le nom du tag"
                />
                <Button type="submit" content="Créer et ajouter"/>
            </Form>

        </Segment>
    }
}


class FormProblem extends Component {
    static propTypes = {
        pb: PropTypes.object,
    };

    state = {
        name: "",
        description: "",
        loading: false,
        previewImage: false,
        hasError: false,
        error: null,
        isAddingTag: false,
        tagLoading: false,
    };

    handleNameChange(e, {value}) {
        this.setState({name: value})
    }

    handleDescriptionChange(e, {value}) {
        this.setState({description: value})
    }

    handleImageChange(e, {value}) {
        this.setState({image: value})
    }

    handlePDFChange(e, {value}) {
        this.setState({pdf: value})
    }

    handleTexChange(e, {value}) {
        this.setState({tex: value})
    }

    handleMediaChange(e, {value}) {
        this.setState({media: value})
    }

    handleSubmit(e, {value}) {
        e.preventDefault();
        let address = "";
        let method = "";
        let data = {
            name: this.state.name,
            description: this.state.description,
        };
        if (this.state.pdf) data.pdf = this.state.pdf;
        if (this.state.tex) data.tex = this.state.tex;
        if (this.state.image) data.image = this.state.image;
        if (this.state.medias) data.medias = this.state.medias;

        if (this.props.pb) {
            method = "PATCH";
            address = config.apiAdress + "/problem/" + this.props.pb.id;
        } else {
            method = "POST";
            address = config.apiAdress + "/problem";
        }

        this.setState({loading: true})
        console.log(method + " to " + address);
        fetch(address, {
            credentials: "include",
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: "cors",
            body: JSON.stringify(data),
        })
            .then(result => {
                if (result.status === 204)
                    this.setState({
                        loading: false,
                    })
                else if (result.status === 201) {
                    return result.json()
                        .then(data => {
                            console.log("pr created :", data);
                            this.setState({
                                loading: false,
                                redirectTo: "/admin/problem/" + data.id,
                            })
                        })
                }
                else {
                    console.log("Unexpected answer : ", result)
                    this.setState({
                        loading: false,
                        hasError: true,
                        error: result.statusText
                    })
                }
            })
    }

    componentDidMount() {
        if (this.props.pb)
            this.setState(this.props.pb)
    }

    render() {
        if (this.state.redirectTo)
            return <Redirect to={this.state.redirectTo}/>

        return <Container>
            {this.state.pb ?
                <TransitionablePortal onClose={() => {
                    this.setState({previewImage: false})
                }}
                                      open={this.state.previewImage}>
                    <Segment style={{left: '40%', position: 'fixed', top: '20%', zIndex: 1000}}>
                        <Image size="big" rounded
                               src={config.apiAdress + '/problem/' + this.props.pb.id + "/image"}/>
                    </Segment>
                </TransitionablePortal>
                : ""}

            <Menu secondary>
                <Menu.Item>
                    <Header as="h1">
                        {this.props.pb ?
                            "Modification d'un problème"
                            :
                            "Création d'un problème"
                        }
                    </Header>
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Button as={Link} to="/admin" content="Retour à la page admin" basic/>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>

            <Form error={this.state.hasError}>
                <Segment loading={this.state.loading} vertical>
                    <Form.Input label="Nom du problème" placeholder="Le nom officiel du problème"
                                value={this.state.name}
                                onChange={this.handleNameChange.bind(this)}/>
                    <Form.TextArea label='Description' value={this.state.description}
                                   onChange={this.handleDescriptionChange.bind(this)}
                                   placeholder='Une description du problème, des enjeux, des problématiques abordées...'/>
                </Segment>
                <Segment loading={this.state.loading} vertical>
                    <Form.Field>
                        <label>Image (.png)
                            {this.props.pb ?
                                <Label as="a" attached='top right' content="Preview Image"
                                       onClick={() => {
                                           this.setState({previewImage: true})
                                       }}/> : ""}
                        </label>
                        <input type="file" value={this.state.image}
                               onChange={(e) => this.setState({image: e.target.value})}/>
                    </Form.Field>
                </Segment>
                <Segment loading={this.state.loading} vertical>
                    <Form.Field>
                        <label>PDF
                            {this.props.pb ?
                                <Label as="a" attached='top right' content="Download pdf" icon="download"
                                       href={config.apiAdress + '/problem/' + this.props.pb.id + '.pdf'}/> : ""}
                        </label>
                        <input type="file" value={this.state.pdf}
                               onChange={(e) => this.setState({pdf: e.target.value})}/>
                    </Form.Field>
                </Segment>
                <Segment loading={this.state.loading} vertical>
                    <Form.Field>
                        <label>tex file
                            {this.props.pb ?
                                <Label as="a" attached='top right' content="Download tex" icon="download"
                                       href={config.apiAdress + '/problem/' + this.props.pb.id + '.tex'}/> : ""}
                        </label>
                        <input type="file" value={this.state.tex}
                               onChange={(e) => this.setState({tex: e.target.value})}/>
                    </Form.Field>
                </Segment>
                <Segment loading={this.state.loading} vertical>
                    <Form.Field>
                        <label>Medias (.zip)
                            {this.props.pb ?
                                <Label as="a" attached='top right' content="Download medias" icon="download"
                                       href={config.apiAdress + '/problem/' + this.props.pb.id + '.zip'}/> : ""}
                        </label>
                        <input type="file" value={this.state.media}
                               onChange={(e) => this.setState({medias: e.target.value})}/>
                    </Form.Field>
                </Segment>
                <Message error>
                    <Message.Header content="Something went wrong :"/>
                    <p>Error : {this.state.error}</p>
                    <p>Try again or save your changes and contact your administrator.</p>
                </Message>
                <Segment vertical loading={this.state.loading}>
                    <Button onClick={this.handleSubmit.bind(this)}>Submit</Button>
                </Segment>
            </Form>

            <Divider hidden/>
            {this.props.pb &&
            <AddTag probId={this.props.pb.id} addTag={this.props.addTag} removeTag={this.props.removeTag}
                    tags={this.props.pb.tags}/>
            }
        </Container>
    }
}

export default FormProblem;