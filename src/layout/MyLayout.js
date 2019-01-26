import React, {Component} from 'react';

import MyHeader from './MyHeader';
import MyFooter from './MyFooter';

class MyLayout extends Component {
    render() {

        return (
            <div>
                <MyHeader/>
                    {this.props.children}
                <MyFooter/>
            </div>
        )
    }
}

export default MyLayout;