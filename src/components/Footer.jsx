import React from 'react'
import {Grid,Typography} from '@material-ui/core/'

export default class Footer extends React.Component {

    render() {
        return (
            <footer>
                <Grid container direction="column" justify="flex-end" alignItems="center" style={{ minHeight: "200px", width: "auto", backgroundColor: "#616161" }}>
                    <Grid item style={{width:"100%"}}>
                        <Grid container style={{maxWidth:"900px",margin:"0 auto"}}  direction="row" justify="center" alignItems="center">
                            <Grid item>
                            
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item style={{ height: "50px",width:"100%", backgroundColor: "#212121" }} >
                        <Grid container style={{maxWidth:"900px",height:"100%",margin:"0 auto"}} direction="row" justify="center" alignItems="center">
                            <Grid item>
                                <Typography color="primary">© {new Date().getFullYear()}|</Typography>
                            </Grid>
                            
                            <Grid item>
                                <Typography color="primary">Site developed by</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </footer>
        );
    }

}