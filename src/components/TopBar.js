import React, {Component} from 'react';
import logo from "../assets/images/logo.svg";

class TopBar extends Component {
    render() {
        return (
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <span className="App-title">Around</span>
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}

export default TopBar;