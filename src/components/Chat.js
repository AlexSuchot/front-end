import React, { Component } from 'react'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'

class Chat extends Component {
    constructor(props){
        super(props);
        this.state={
            messages:''
        };
    }

    componentDidMount() {
        this.ws.onopen = () => {
            console.log('connected');
        };

        this.ws.onmessage = evt => {
            const message = JSON.parse(evt.data);
            this.addMessage(message)
        };

        this.ws.onclose = (event) => {
            console.log(event);
            console.log('disconnected');
        }
    }

    addMessage = message =>
        this.setState(state => ({ messages: [message, ...state.messages] }));

    submitMessage = messageString => {
        // on submitting the ChatInput form, send the message, add it to the list and reset the input
        const message = { message: messageString };
        this.ws.send(JSON.stringify(message));
        this.addMessage(message)
    };

    render() {
        return (
            <div>
                <ChatInput
                    ws={this.ws}
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
