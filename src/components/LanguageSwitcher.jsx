import React from 'react'
import { connect } from 'react-redux'
import { i18nActions } from 'redux-react-i18n'
import { Language } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'

import Button from '@material-ui/core/Button';
import { itemConstants } from '../constants'

const mapStateToProps = (state) => {
    const { currentLanguage } = state.i18n;
    return {
        currentLanguage,
        currency: state.item.currency
    }
}

const mapDispatchToProps = (dispatch) => ({
    switchLanguage: (code) => dispatch(i18nActions.setCurrentLanguage(code)),
    setCurrency: (currency) => dispatch({ type: itemConstants.SET_CURRENCY, data: currency }),
})

class LanguageSwitcher extends React.Component {
    state = {
        open: false,
    };

    handleClick = () => {
        this.setState({ open: !this.state.open });
    };

    handleClose = (ln) => (event) => {
        this.setState({ open: false });
        if (ln) {
            this.props.switchLanguage(ln)
            localStorage.setItem('lang', ln);
            if (ln === "ru-RU") {
                this.props.setCurrency('rub')
                localStorage.setItem('currency', 'rub');
            }
            else {
                 this.props.setCurrency('dol');
                 localStorage.setItem('currency', 'dol'); 
            }
        }


    };


    render() {

        const styles = {
            dropdown: {
                position: "relative",
                display: "inline-block",
                height: "100%"
            },
            dropdownContent: {
                display: "none"
            },
            block: {
                display: "block",
                position: "absolute",
                backgroundColor: "#fff",
                boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
                zIndex: "1",
                right: "0px",
                top: "50px"
            }
        }

        return (
            <div style={styles.dropdown}>
                <IconButton onClick={this.handleClick}>
                    <Language color="primary" />
                </IconButton>
                <div style={this.state.open ? styles.block : styles.dropdownContent}>
                    <Button onClick={this.handleClose('en-US')} color="primary">
                        Eng
                    </Button>
                    <Button onClick={this.handleClose('ru-RU')} color="primary">
                        Рус
                    </Button>
                </div>


            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcher)