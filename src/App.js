import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import MyLayout from './layout/MyLayout';
import Problem from './body/Problem';
import Index from './body/Index';
import AdminView from './body/AdminView';

class App extends Component {

    render() {
        return (
            <MyLayout>
                <BrowserRouter>
                    <Switch>
                        {/* According to https://tylermcginnis.com/react-router-pass-props-to-components/ , the
                        best way to pass props to routes is with the render prop */}
                        <Route path="/problem/:id" component={Problem}/>
                        <Route path="/admin" component={AdminView}/>
                        <Route path="/" exact component={Index}/>
                    </Switch>
                </BrowserRouter>
            </MyLayout>
        );
    }
}

export default App;
