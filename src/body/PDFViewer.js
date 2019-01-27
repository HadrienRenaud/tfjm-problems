import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Header, Icon, Menu, Segment} from "semantic-ui-react";
import Pdf from "react-pdf-js";

const centered = {
    textAlign: 'center'
}

class PDFViewer extends Component {
    static propTypes = {
        url: PropTypes.string.isRequired
    };

    state = {
        page: 1,
        pages: 2,
    };

    getScale() {
        return 1.5;
    }
    onDocumentComplete = (pages) => {
        this.setState({page: 1, pages});
    }

    handlePrevious = () => {
        this.setState({page: this.state.page - 1});
    }

    handleNext = () => {
        this.setState({page: this.state.page + 1});
    }

    render = () => {
        return (<div>
                <Menu attached='top'>
                    <Menu.Item>
                        <Button icon
                                labelPosition='left'
                                className={this.state.page === 1 ? "disabled" : ""}
                                onClick={this.handlePrevious}
                        >
                            <Icon name='left arrow'/>
                            Previous Page
                        </Button>
                    </Menu.Item>
                    <Menu.Item>
                        <Header>
                            Preview
                        </Header>
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item>

                            <Button icon
                                    labelPosition='right'
                                    href={this.props.url + '.pdf'}
                            >
                                <Icon name='download'/>
                                Get PDF
                            </Button>
                        </Menu.Item>
                        <Menu.Item>
                            <Button icon
                                    labelPosition='right'
                                    href={this.props.url + '.tex'}
                            >
                                <Icon name='download'/>
                                Get TEX
                            </Button>
                        </Menu.Item>
                        <Menu.Item>
                            <Button icon
                                    labelPosition='right'
                                    href={this.props.url + '.zip'}
                            >
                                <Icon name='download'/>
                                Get Medias
                            </Button>

                        </Menu.Item>
                        <Menu.Item>
                            <Button icon
                                    labelPosition='right'
                                    className={this.state.page === this.state.pages ? "disabled" : ""}
                                    onClick={this.handleNext}
                            >
                                Next Page
                                <Icon name='right arrow'/>
                            </Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <Segment attached="bottom" style={centered}>
                    <Pdf
                        file={this.props.url + '.pdf'}
                        onDocumentComplete={this.onDocumentComplete}
                        page={this.state.page}
                        scale={this.getScale()}
                    />
                </Segment>
            </div>
        )
    }
}


export default PDFViewer;