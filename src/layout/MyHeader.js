import React, {Component} from 'react';
import {Menu, Container, Header, Dropdown} from 'semantic-ui-react';

class MyHeader extends Component {
    render() {
        return (
            <Menu size="massive">
                <Container>
                    <Menu.Item>
                        <a href="/">
                            Home
                        </a>
                    </Menu.Item>
                    <Menu.Item fluid textAlign='center'>
                        <Header as="h2" textAlign='center'>
                            Problèmes du TFJM
                        </Header>
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Dropdown item text="About">
                            <Dropdown.Menu>
                                <Dropdown.Item><a href="mailto://contact@tfjm.org">Contact</a></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Menu.Item>
                            <a href="https://tfjm.org">TFJM</a>
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
        )
    }
}

export default MyHeader;