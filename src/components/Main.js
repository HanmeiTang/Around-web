// This defines the main widget part of the login page
import React, {Component} from 'react';
import Register from "./Register";
import {Switch, Route} from "react-router-dom";
import Login from "./Login";

class Main extends Component {
    render() {
        return (
            <div className="main">
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                </Switch>
            </div>
        );
    }
}

export default Main;
