import React, {Component} from 'react';
import {
    Button,
    Divider,
    Header,
    Input,
    List,
    Segment,
} from "semantic-ui-react";
import PropTypes from 'prop-types';

class Filter extends Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        tags: PropTypes.array.isRequired,
        onSearchChange: PropTypes.func.isRequired,
    };

    render() {
        return (
            <Segment padded='very'>
                <Header as="h3" content="Filtrer"/>
                <Input fluid placeholder='Rechercher...' onChange={this.props.onSearchChange}/>
                <Divider/>
                <List horizontal>
                    {this.props.tags.map((tag) => {
                            if (tag)
                                return <List.Item key={tag.id}>
                                    <Button
                                        onClick={(e) => {
                                            this.props.onClick(e, tag.id)
                                        }}
                                        className={tag.isTriggered ? '' : 'basic'}
                                        color="blue"
                                    >
                                        {tag.name}
                                    </Button>
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
