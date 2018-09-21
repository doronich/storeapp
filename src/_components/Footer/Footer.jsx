import React from 'react'
import { Grid, Typography } from '@material-ui/core/'
import { Link } from 'react-router-dom';
import "./style.css"
import { Loc } from 'redux-react-i18n';

export class Footer extends React.Component {

    render() {
        return (
            <footer className="footer_font">

                <Grid container direction="row" justify="flex-start">
                    <Grid item xs={12} style={{ backgroundColor: "#252829" }}>
                        <Grid container className="container" direction="row" justify="center">
                            <Grid item sm={3} xs={12}>
                                <div className="footer-block">
                                    <h3><Loc locKey="footer.info.info" /></h3>
                                    <ul>
                                        <li><Link className="footer-link" to="/contacts"><Loc locKey="footer.info.contacts" /></Link></li>
                                        <li><Link className="footer-link" to="/about"><Loc locKey="footer.info.about" /></Link></li>
                                        <li><Link className="footer-link" to="/delivery"><Loc locKey="footer.info.delivery" /></Link></li>
                                    </ul>
                                </div>
                            </Grid>
                            <Grid item sm={3} xs={12}>
                                <div className="footer-block">
                                    <h3><Loc locKey="footer.additional.additional" /></h3>
                                    <ul>
                                        <li></li>
                                    </ul>
                                </div>
                            </Grid>
                            <Grid item sm={3} xs={12}>
                                <div className="footer-block">
                                    <h3><Loc locKey="footer.acc.acc" /></h3>
                                    <ul>
                                        <li><Link className="footer-link" to="/profile"><Loc locKey="footer.acc.acc" /></Link></li>
                                        <li><Link className="footer-link" to="/register"><Loc locKey="footer.acc.reg" /></Link></li>
                                        <li><Link className="footer-link" to="/login"><Loc locKey="footer.acc.log" /></Link></li>
                                        <li><Link className="footer-link" to="/favorites"><Loc locKey="footer.acc.favs" /></Link></li>
                                    </ul>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ height: "50px", width: "100%", backgroundColor: "#202124" }} >
                        <Grid container className="container" style={{ height: "100%", margin: "0 auto" }} direction="row" justify="center" alignItems="center">
                            <Grid item>
                                <Typography color="primary">© {new Date().getFullYear() + " | "} </Typography>
                            </Grid>

                            <Grid item>
                                <Typography color="primary"> {" Site powered by"} <a href="skype:dm8t34" style={{ color: "inherit", borderBottom: "1px solid white" }}>Maksel Dmitriy</a></Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </footer >
        );
    }

}