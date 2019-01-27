import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Image, List} from "semantic-ui-react";
import {Link} from "react-router-dom";


class ProbCard extends Component {
    static propTypes = {
        problem: PropTypes.object.isRequired
    }

    render() {
        return (
            <Link to={"/problem/" + this.props.problem.id} className="card">
                <Image src='http://smilylove.s.m.pic.centerblog.net/o/0c0966b7.jpg' />
                <Card.Content>
                    <Card.Header>
                        {this.props.problem.name}
                    </Card.Header>
                    <Card.Description>
                        {this.props.problem.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <List horizontal>
                        {this.props.problem.tags.map((tag) => {
                                if (tag)
                                    return <List.Item key={tag.id}>
                                        <Button color="grey" basic size="mini">
                                            {tag.name}
                                        </Button>
                                    </List.Item>
                                else return ""
                            }
                        )}
                    </List>
                </Card.Content>
            </Link>
        )
    }
}

export default ProbCard;
