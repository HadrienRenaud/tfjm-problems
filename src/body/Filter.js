import React, {Component} from 'react';
import {
    Checkbox,
    Container,
    Divider,
    Header,
    Input,
    Label,
    List,
    Menu,
    Search,
    Segment,
    Sticky
} from "semantic-ui-react";
import PropTypes from 'prop-types';

class Filter extends Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        tags: PropTypes.array.isRequired,
    }

    render() {
        return (
            <Segment>
                <Header as="h3" content="Filter"/>
                <Input fluid placeholder='Search...'/>
                <Divider/>
                <List horizontal>
                    {this.props.tags.map((tag) => {
                            if (tag)
                                return <List.Item key={tag.id}>
                                    <Label
                                        onClick={(e) => {
                                            this.props.onClick(e, tag.id)
                                        }}
                                        className={tag.isTriggered ? '' : 'basic'}
                                        color="blue"
                                    >
                                        {tag.name}
                                    </Label>
                                </List.Item>
                            else return ""
                        }
                    )}
                </List>
            </Segment>
        )
    }
}


export default Filter;
