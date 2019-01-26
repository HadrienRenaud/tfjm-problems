import React, {Component} from 'react';
import {Menu, Container} from 'semantic-ui-react';

class MyHeader extends Component {
    render() {
        return (
            <Menu>
                <Container>
                    <Menu.Item>
                        BOnjour
                    </Menu.Item>
                </Container>
            </Menu>
        )
    }
}

export default MyHeader;