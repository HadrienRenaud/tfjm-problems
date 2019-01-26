import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import MyLayout from './layout/MyLayout';
import Problem from './body/Problem';
import Index from './body/Index';
import config from './config';
import {Dimmer, Loader} from "semantic-ui-react";
import ErrorMessage from "./errors/ErrorMessage";

class App extends Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            problems: [],
            hasError: false,
            error: null,
        }
    }

    componentDidMount() {
        let adress = config.apiAdress + '/index';
        console.log('Calling ' + adress);
        fetch(adress)
            .then(results => results.json())
            .then(data => {
                console.log(data);
                this.setState({
                    problems: data,
                    loading: false,
                })
            })
            .catch(err => {
                console.error(err);
                this.setState({
                    hasError: true,
                    error: err,
                    loading: false,
                })
            })
    }

    render() {


        this.problems = [];

        return (
            <MyLayout>
                {this.state.hasError && <ErrorMessage err={this.state.error}/>}
                {!this.state.loading &&
                <BrowserRouter>
                    <Dimmer active={this.state.loading}>
                        <Loader/>
                        <Switch>
                            {/* According to https://tylermcginnis.com/react-router-pass-props-to-components/ , the
                        best way to pass props to routes is with the render prop */}
                            <Route path="/problem/:id"
                                   render={(props) => <Problem {...props} problems={this.state.problems}/>}/>
                            <Route path="/" render={(props) => <Index {...props} problems={this.state.problems}/>}/>
                        </Switch>
                    </Dimmer>
                </BrowserRouter>
                }
            </MyLayout>
        );
    }
}

export default App;
