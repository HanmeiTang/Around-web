import React, {Component} from 'react';
import TopBar from './TopBar';
import Main from './Main.js';
import '../styles/App.css';
import {TOKEN_KEY} from '../constants';


// Functions of this app:
// 1. register
// 2. initial login (fetch token)
// 3. persistent login (by storing token)
// 4. logout (delete token)
// * TOKEN saved in local storage, google "window.localStorage"
// * Token is not destroyed by browser refresh

// Structure of this app:
// App
// |- TopBar
// |- Main
//      |- Login --> Generate token, and saved at window.localStorage
//      |- Register
//      |- Home

// Q: So we need to use Token twice, where to store the Token?
// A: App

// Data Communication: Sibling has no relationship
// the best design: Generate token --> --> super super parent 'App'
// 1. child modifies parent node
// 2. the 2nd child node get token from its parent

class App extends Component {
    state = {
        isLoggedIn: Boolean(localStorage.getItem(TOKEN_KEY)),
    };

    handleLoginSucceed = (token) => {
        localStorage.setItem(TOKEN_KEY, token);
        this.setState({isLoggedIn: true});
    };

    handleLogout = () => {
        localStorage.removeItem(TOKEN_KEY);
        this.setState({isLoggedIn: false});
    };

    render() {
        return (
            <div className="App">
                <TopBar handleLogout={this.handleLogout}
                        isLoggedIn={this.state.isLoggedIn}
                />

                <Main
                    // 子組件傳data給父組件
                    // 通過callback function實現
                    handleLoginSucceed={this.handleLoginSucceed}
                    isLoggedIn={this.state.isLoggedIn}
                />

            </div>
        )
    }
}

export default App;
