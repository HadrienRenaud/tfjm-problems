import React, {Component} from 'react';

import MyHeader from './MyHeader';
import MyFooter from './MyFooter';
import {Segment} from "semantic-ui-react";

class MyLayout extends Component {
    render() {

        return (
            <div>
                <MyHeader/>
                <Segment>
                    {this.props.children}
                </Segment>
                <MyFooter/>
            </div>
        )
    }
}

export default MyLayout;