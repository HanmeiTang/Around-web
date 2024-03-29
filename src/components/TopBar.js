import React, {Component} from 'react';
import {Icon} from 'antd';
import logo from "../assets/images/logo.svg";

class TopBar extends Component {
    render() {
        return (
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <span className="App-title">Around</span>

                    {/*Logout widget*/}
                    {this.props.isLoggedIn ?
                        <a className="logout" onClick={this.props.handleLogout}>
                            <Icon type="logout"/> {'  '}
                            Logout
                        </a> : null}

                </header>
            </div>
        );
    }
}

export default TopBar;