import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card} from "semantic-ui-react";
import {Link} from "react-router-dom";


class ProbCard extends Component {
    static propTypes = {
        problem: PropTypes.object.isRequired
    }

    render() {
        return (
            <Link to={"/problem/" + this.props.problem.id} className="card">
                <Card.Content>
                    <Card.Header>
                        {this.props.problem.name}
                    </Card.Header>
                    <Card.Description>
                        {this.props.problem.description}
                    </Card.Description>
                </Card.Content>
            </Link>
        )
    }
}

export default ProbCard;
