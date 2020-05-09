import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            afterLogin: false,
            items: [],
            ws: {},
        };
    }

    componentDidMount() {
        this.setState({ws: new WebSocket('ws://backend.cleverapps.io')});
    }

    afterLogin = (afterLogin) => {
        this.setState({afterLogin});
    };

    render() {

        if (this.state.afterLogin === true) {
                return (
                    <div className='App'>
                        <Chat ws={this.state.ws} />
                    </div>
                )
        } else {
            return (
                <div className='App'>
                    <Login ws={this.state.ws} afterLogin={this.afterLogin}/>
                    <Register/>
                </div>
            );
        }
    }

    fetchRandom = () => {
        fetch('https://backend.cleverapps.io/random')
            .then((res) => res.json())
            .then((json) => {
                this.setState({ items: json });
            })
            .catch(console.log);
    };

    getStatus = () => {
        return fetch(`https://backend.cleverapps.io/status`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
    };
}

export default App;
