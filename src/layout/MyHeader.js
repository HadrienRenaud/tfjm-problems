import React, {Component} from 'react';
import {Menu, Container, Header, Dropdown} from 'semantic-ui-react';

class MyHeader extends Component {
    render() {
        return (
            <Menu size="massive">
                <Container>
                    <Menu.Item>
                        <a href="/">
                            Accueil
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <Header as="h2">
                            Les Problèmes du TFJM²
                        </Header>
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <a href="https://tfjm.org/les-problemes/">Les problèmes actuels</a>
                        </Menu.Item>
                        <Dropdown item text="À propos">
                            <Dropdown.Menu>
                                <Dropdown.Item> <a href="mailto://contact@tfjm.org">Contact</a> </Dropdown.Item>
                                <Dropdown.Item> <a href="https://tfjm.org">TFJM²</a> </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                </Container>
            </Menu>
        )
    }
}

export default MyHeader;