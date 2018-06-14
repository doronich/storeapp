import React from 'react'
import { connect } from 'react-redux';
import { connection } from '../../services'
import { Link } from 'react-router-dom'

import { IconButton, Input, Grid, Typography } from '@material-ui/core'
import { Send } from '@material-ui/icons'
import { Loc } from 'redux-react-i18n'

function mapStateToProps(state) {
    const { currentUser, loggedIn } = state.authentication;
    return {
        currentUser, loggedIn
    };
}

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            message: "",
            messages: [],
            hubConnection: null,
            typing:false,
            users:[]
        }
    }

    componentDidMount() {
        //if (!this.props.currentUser) return;
        const username = this.props.currentUser?this.props.currentUser.username:""

        this.setState({ hubConnection: connection, username }, () => {
            this.state.hubConnection
                .start()
                .then(() => console.log("connection started"))
                .catch(err => console.log('Error while establishing connection',err))

            this.state.hubConnection.on('Send', (username, message) => {
                const time = new Date();
                const text = (<Typography variant="subheading"
                                color="primary"
                                >
                                <span style={{fontSize:"12px"}}>{time.getHours() + ":" + time.getMinutes()}</span>
                                <span style={{color:"#000",fontWeight:"600"}}> {username}</span>
                                <span>: {message}</span></Typography>);
                const messages = this.state.messages.concat([text]);
                this.setState({ messages });
                const elem = document.getElementById("chatDisplay");
                elem.scrollTop = elem.scrollHeight;

            });
            
            this.state.hubConnection.on('StartTyping', (username)=>{
                if(this.state.users.indexOf(username)<0){
                    const users = this.state.users.concat([username]);
                    const typing = this.state.users.length>0;
                    this.setState({users,typing});
                }else{
                    const typing = this.state.users.length>0;
                    this.setState({typing});
                }
            
            });

            this.state.hubConnection.on('StopTyping', (username)=>{
                const users = this.state.users.splice(this.state.users.indexOf(username),1);
                const typing = this.state.users.length>0;
                this.setState({users,typing});
            });
        });
    }

    static getDerivedStateFromProps(props, state) {
        return {
            username: props.currentUser?props.currentUser.username:""
        }
    }

    sendMessage = (event) => {
        event.preventDefault();
        if (!this.state.message) return;

        this.state.hubConnection
            .invoke('SendMessage', this.state.username, this.state.message)
            .catch(err => console.error(err));

        this.setState({ message: '' });
    }

    timerId=null;
    
    changeInput = async (e)=>{
        
        this.state.hubConnection
            .invoke("SendTyping",this.props.currentUser.username)
            .catch(err => console.error(err));
        await this.setState({ message: this.state.message.length<=150 ? e.target.value:this.state.message })
        clearTimeout(this.timerId)
        this.timerId = setTimeout(()=>{
            this.state.hubConnection.invoke("DeleteTyping", this.props.currentUser.username)
                .catch(err=>console.error(err));            
        },1000)

    }

    render() {

        return (
            <Grid container direction="column" >
                <Grid item id="chatDisplay" style={{ height: "400px",width:"100%", overflowY: "scroll", overflowX: "hidden",paddingLeft:"10px" }}>
                    <Typography variant="subheading" color="textSecondary"><Loc locKey="chat.welcome"/></Typography>
                    {
                        this.state.messages.map((message, index) => (
                            <span className="wordWrap" key={index}>{message}</span>
                        ))
                    }
                    {
                        this.state.typing ? <Typography variant="caption" style={{overflow:"hidden"}}>
                        {
                            this.state.users.map((user, index) =>( <span key={index}>{user} </span>))
                        }
                     <Loc locKey="chat.typing"/></Typography>:null

                    }
                </Grid>

                {
                    this.props.loggedIn ? <Grid item style={{ border: "1px solid #ddd" }}>
                        <form onSubmit={this.sendMessage}>
                            <Grid container direction="row" justify="space-between">
                                <Grid item xs={9} style={{ paddingLeft:"10px", paddingTop: "10px" }}>
                                    <Input
                                        placeholder="Write a message..."//{<Loc locKey="chat.send"/>}
                                        type="text"
                                        value={this.state.message}
                                        onChange={this.changeInput}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item >
                                    <IconButton type="submit">
                                        <Send />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    :
                    <Grid item style={{ border: "1px solid #ddd" }}> 
                        <Link to="/login" style={{ textDecoration:"underline",height:"40px" }}> <Typography align="center"><Loc locKey="chat.auth"/></Typography></Link>
                    </Grid>
                }

            </Grid>
        )
    }
}

const connectedChat = connect(mapStateToProps)(Chat);
export { connectedChat as Chat };