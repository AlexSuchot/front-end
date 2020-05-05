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

    fetchLogin = () => {
        const { history } = this.props;
        fetch(`https://backend.cleverapps.io/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }).then(function(response) {
            return response;
        })
            .then(function(response){
                let blob = fetch(`https://backend.cleverapps.io/wsTicket`, {
                    method: 'GET',
                    credentials: 'include'
                });
                if (blob.status === 200) {
                    blob.text().then(function(ticket) {
                            this.ws.send(ticket);
                            this.ws.addEventListener('message', onmessage);
                            history.push('/chat');
                            this.props.afterLogin(true);
                        }
                    )
                }

                console.log(response);
            });
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
