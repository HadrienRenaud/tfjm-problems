import React, {Component} from 'react';
import {Button, Header, List, Segment} from "semantic-ui-react";
import PropTypes from 'prop-types';

class Filter extends Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        tags: PropTypes.array.isRequired,
    }

    render() {
        return <Segment>
            <Header as="h3" content="Filter"/>
            <List>
                {this.props.tags.map((tag) => {
                        if (tag)
                            return <List.Item key={tag.id}>
                                <Button onClick={(e) => this.props.onClick(e, tag.id)}>
                                    {tag.name}
                                </Button>
                            </List.Item>;
                        else return ""
                    }
                )}
            </List>
        </Segment>
    }
}


export default Filter;
