import React, { Component } from 'react'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'

class Chat extends Component {
    constructor(props){
        super(props);
        this.state={
            messages:[]
        };
    }

    componentDidMount() {
        this.props.ws.onopen = () => {
            console.log('connected');
        };

        this.props.ws.onmessage = evt => {
            const message = evt.data;
            console.log(evt.data);
            console.log(evt);
            console.log(message);
            this.addMessage(message);
            console.log(this.addMessage(message));
        };

        this.props.ws.onclose = (event) => {
            console.log(event);
            console.log('disconnected');
        }
    }

    addMessage = message =>
        this.setState(state => ({ messages: [message, ...state.messages] }));

    submitMessage = messageString => {
        // on submitting the ChatInput form, send the message, add it to the list and reset the input
        const message = { message: messageString };
        this.props.ws.send(JSON.stringify(message));
        this.addMessage(message)
    };

    render() {
        return (
            <div>
                <ChatInput
                    ws={this.props.ws}
                    onSubmitMessage={messageString => this.submitMessage(messageString)}
                />
                {this.state.messages.map((message, index) =>
                    <ChatMessage
                        key={index}
                        message={message.message}
                    />,
                )}
            </div>
        )
    }
}

export default Chat
