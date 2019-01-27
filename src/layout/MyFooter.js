import React, {Component} from 'react';
import {Container, Divider, Grid, Header, Icon, Image, List, Segment} from 'semantic-ui-react';

class MyFooter extends Component {
    render() {
        return (
            <Segment padded='very'>
                <Container>
                    <Grid columns={3} style={{textAlign: 'center'}}>
                        <Grid.Column>
                            <Header>
                                Organisé par
                            </Header>
                            <Image src="https://www.animath.fr/wp-content/themes/animath/img/logo-animath.jpg"
                                   as='a'
                                   href="https://www.animath.fr"
                                   target='_blank'
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <Header>
                                Les essentiels
                            </Header>
                            <List>
                                <List.Item><a href="https://tfjm.org/contact">Nous Contacter</a></List.Item>
                                <List.Item><a href="https://tfjm.org/espace-presse">Presse</a></List.Item>
                                <List.Item><a href="https://tfjm.org/les-partenaires">Nos partenaires</a></List.Item>
                                <List.Item><a href="https://tfjm.org/les-tournois">Les tournois</a></List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column>
                            <Header>
                                Mentions légales
                            </Header>
                            <List>
                                <List.Item><a href="https://tfjm.org/informations-legales">Informations
                                    Légales</a></List.Item>
                                <List.Item><a href="https://www.animath.fr">Animath</a></List.Item>
                            </List>
                            <Divider hidden/>
                            <List horizontal>
                                <List.Item>
                                    <a href="https://www.facebook.com/TFJM2/"> <Icon name="facebook official" size='big'/> </a>
                                </List.Item>
                                <List.Item>
                                    <a href="https://twitter.com/TFJM2"> <Icon name="twitter" size='big'/> </a>
                                </List.Item>
                                <List.Item>
                                    <a href="mailto:contact@tfjm.org"> <Icon name="mail" size='big'/> </a>
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </Grid>
                    <Divider hidden/>
                    <div style={{textAlign: 'center'}}>
                    Copyright © 2019 &nbsp;
                    <a href="https://tfjm.org/">
                        Tournois Français des Jeunes Mathématiciennes et Mathématiciens
                    </a>
                    </div>
                </Container>
            </Segment>
        )
    }
}

export default MyFooter;