import React from 'react';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            email:''
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        this.fetchRegister();
    };

    fetchRegister = () => {
        fetch(`https://backend.cleverapps.io/subscribe`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            })
        }).then(function (response) {
            return response;
        })
            .then(function (response) {
                console.log(response);
            });
    };


    render = () => {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Register</h1>
                <label>
                    Username :
                    <input type="text" value={this.state.username} onChange = {(event) => this.setState({username:event.target.value})} />
                    Password :
                    <input type="password" value={this.state.password} onChange = {(event) => this.setState({password:event.target.value})} />
                    Email :
                    <input type="email" value={this.state.email} onChange = {(event) => this.setState({email:event.target.value})} />
                </label>
                <input type="submit" value="Send" />
            </form>
        );
    };
}

export default Register;
