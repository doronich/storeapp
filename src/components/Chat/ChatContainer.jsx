import React from 'react'

import { AppBar, IconButton, Typography, Grid} from '@material-ui/core'
import { ArrowDropUp, ArrowDropDown } from '@material-ui/icons'
import { Chat } from './Chat'

export class ChatContainer extends React.Component {
    state = {
        opened: false
    }

    toggleChat = () => {
        this.setState({ opened: !this.state.opened })
    }

    render() {
        const display = this.state.opened ?"block":"none";

        const styles = {
            chat: {
                position: "fixed",
                bottom: "0",
                right: "80px",
                zIndex: "999",
                width: "300px",
                backgroundColor: "rgb(240, 240, 240)",
                boxShadow: "0px 3px 25px rgb(43, 43, 43)"
            }
        }

        return (
            <div style={styles.chat} className="mobile600">
                <AppBar position="static" color="secondary" style={{ height: "50px" }}>
                    <Grid container direction="row" alignItems="center">
                        <Grid item>
                            <IconButton color="inherit" aria-label="Menu" onClick={this.toggleChat}>
                                {
                                    this.state.opened ? <ArrowDropDown /> : <ArrowDropUp />
                                }
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Typography variant="title" color="inherit">
                                Чат
                            </Typography>
                        </Grid>
                    </Grid>
                </AppBar>

                <div style={{display:display}}>
                    <Chat/>
                </div>

                {/* <Slide direction="up" in={this.state.opened} mountOnEnter unmountOnExit  >
                    <Chat />
                </Slide> */}

            </div>
        )
    }
}