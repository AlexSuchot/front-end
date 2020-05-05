import React from 'react';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        this.fetchLogin();
    };

    fetchLogin = async () => {
        const { history } = this.props;
        await fetch(`https://backend.cleverapps.io/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
        });
        this.fetchTicket();
        console.log("là ?");
    };

    fetchTicket = async () => {
        let blob = await fetch(`https://backend.cleverapps.io/wsTicket`, {
            method: 'GET',
            credentials: 'include',
        });
        let response = await blob.text();
        this.props.ws.send(response);
        this.props.ws.addEventListener('message', onmessage);
        this.props.afterLogin(true);
    };

    render = () => {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Login</h1>
                <label>
                    Username :
                    <input type="text" value={this.state.username} onChange = {(event) => this.setState({username:event.target.value})} />
                    Password :
                    <input type="password" value={this.state.password} onChange = {(event) => this.setState({password:event.target.value})} />
                </label>
                <input type="submit" value="Send" />
            </form>
        );
    };
}

export default Login;
