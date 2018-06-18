import React from 'react'
import { ItemList } from './Item'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export class Items extends React.Component {


    render() {

        return (
            <Grid container direction="column" justify="flex-start" alignItems="center" style={{height:"100%"}}>
                <Grid item>
                    <Typography align="center" gutterBottom variant="display2" color="primary">Список все товаров</Typography>
                </Grid>
                <Grid item>
                    <ItemList all={true}  {...this.props}/>
                </Grid>
            </Grid>
        )
    }
}