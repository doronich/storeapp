import React from 'react'
import {ItemList} from './Item'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';



export class Items extends React.Component{


    render(){

        return(
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid item>
                    <Typography align="center" gutterBottom variant="display2" color="primary">Список предметов</Typography>
                </Grid>
                <Grid item>
                    <ItemList/>
                </Grid>  
            </Grid>
        )
    }
}