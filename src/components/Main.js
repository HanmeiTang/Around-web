// This defines the main widget part of the login page
import React, {Component} from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import Register from "./Register";
import Login from "./Login";
import Home from "./Home";

class Main extends Component {
    getLogin = () => {
        return this.props.isLoggedIn ? <Redirect to="/home"/> :
            <Login handleLoginSucceed={this.props.handleLoginSucceed}/>;
    };

    getHome = () => {
        return this.props.isLoggedIn ? <Home/> : <Redirect to="/login"/>;
    };


    render() {
        return (
            <div className="main">
                <Switch>
                    {/*render accepts a function*/}
                    <Route path="/login" render={this.getLogin}/>
                    {/*component accepts a component only*/}
                    <Route path="/register" component={Register}/>
                    <Route path="/home" render={this.getHome}/>
                    <Route render={this.getLogin}/>
                </Switch>
            </div>
        );
    }
}

export default Main;
