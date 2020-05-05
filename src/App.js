import React, {Component} from 'react';
import './App.css';
import Login from "./components/Login";
import Register from "./components/Register";
import Chat from "./components/Chat";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            ws: new WebSocket('ws://backend.cleverapps.io/message')
        }
    }

    afterLogin = (afterLogin) => {
        console.log(afterLogin);
    };

    componentDidMount() {

    };

    render() {
        if (true) {
            console.log("ici");
            return <div className="App">
                <Login ws={this.ws} afterLogin={this.afterLogin} />
                <Register/>
            </div>

        } else {
            return <div className="App">
                <Chat ws={this.ws} />;
            </div>
        }

        function Home(ws) {
            return <div>
                <Login ws={ws}/>
                <Register/>
                <div>
                    <button onClick={this.fetchRandom}>Get a number between 0 and 1 :</button>
                    <div>{this.state.items}</div>
                </div>
            </div>
        }

        function Chat(ws) {
            return <Chat ws={ws} />;
        }
    }

    fetchRandom = () => {
        fetch('https://backend.cleverapps.io/random')
            .then(res => res.json())
            .then((json) => {
                this.setState({items: json});
            })
            .catch(console.log);
    };

    getStatus = () => {
        return fetch(`https://backend.cleverapps.io/status`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
    }
}

export default App;
