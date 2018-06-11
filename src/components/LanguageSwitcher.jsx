import React from 'react'
import { connect } from 'react-redux'
import { i18nActions } from 'redux-react-i18n'
import { Language } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


const mapStateToProps = (state) => {
    const { currentLanguage } = state.i18n;
    return {
        currentLanguage
    }
}

const mapDispatchToProps = (dispatch) => ({
    switchLanguage: (code) => dispatch(i18nActions.setCurrentLanguage(code))
})

class LanguageSwitcher extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = (ln)=>(event) => {
        this.setState({ open: false });
        if(ln){
            this.props.switchLanguage(ln)
            localStorage.setItem('lang',ln)
        }
        
    };


    render() {

        return (
            <div style={{height:"100%"}}>
                <IconButton  onClick={this.handleClickOpen}>
                    <Language color="primary"/>
                </IconButton>
                
                <Dialog

                    open={this.state.open}
                    onClose={this.handleClose()}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{"Languages:"}</DialogTitle>
                    <DialogActions>
                        <Button  disabled={this.props.currentLanguage === "en-US"} onClick={this.handleClose('en-US')} color="primary">
                            English
                        </Button>
                        <Button disabled={this.props.currentLanguage === "ru-RU"} onClick={this.handleClose('ru-RU')} color="primary" autoFocus>
                            Русский
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcher)