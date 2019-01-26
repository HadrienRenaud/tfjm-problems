import React, {Component} from 'react';
import {Message} from 'semantic-ui-react';
import PropTypes from 'prop-types';

class ErrorMessage extends Component {
    static propTypes = {
        err: PropTypes.object.isRequired
    }

    render() {
        return (
            <Message error>
                <Message.Header>{this.props.err.name}</Message.Header>
                <p>{this.props.err.message}</p>
                <p>Source : {this.props.err.toSource()}</p>
            </Message>
        )
    }
}

export default ErrorMessage;