import React from 'react'
import { connect } from 'react-redux';
import { chatService } from '../../services'

function mapStateToProps(state) {
    const { currentUser } = state.authenticate;
    return {
        currentUser
    };
}

class Chat extends React.Component {
    constructor(props) {
        super(props);
        console.log("chatprops", this.props)
        console.log("chatConnection", chatService.connection)
        this.state = {
            nick: "",
            message: "",
            messages: [],
            hubConnection: null
        }
    }

    componentDidMount() {
        const nick = this.props.currentUser.username;


        this.setState({ hubConnection: chatService.connection, nick }, () => {
            this.state.hubConnection
                .start()
                .then(() => console.log("connection started"))
                .catch(err => console.log('Error while establishing connection'))

            this.state.hubConnection.on('Send', (message, nick) => {
                const text = `${nick}: ${message}`;
                const messages = this.state.messages.concat([text]);
                this.setState({ messages });
            });

        });
    }

    sendMessage = () => {
        this.state.hubConnection
            .invoke('Send', this.state.nick, this.state.message)
            .catch(err=> console.error(err));

        this.setState({message:''});
    }


    render() {
        return (
            <div>
                <br/>
                <input type="text" value={this.state.message}
                    onChange={e=>this.setState({message:e.target.value})}/>

                    <button onClick={this.sendMessage}>Send</button>
                    <div>
                        {this.state.messages.map((message,index)=>(
                            <span style={{display:"block"}} key={index}>{message}</span>
                        ))}
                    </div>
            </div>
        )
    }
}

const connectedChat = connect(mapStateToProps)(Chat);
export { connectedChat as Chat };