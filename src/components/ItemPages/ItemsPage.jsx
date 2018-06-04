import React from 'react'
import { ItemList } from './Item'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//import {Filters} from '../Filters'

export class ItemsPage extends React.Component {

    render() {
        return (
            <Grid container direction="column" justify="center" alignItems="center">

                <Grid item>
                    <Typography align="center" gutterBottom variant="display2" color="primary">Список товаров</Typography>
                </Grid>
                <Grid item  style={{width:"100%"}}>
                    {/* <Filters/> */}
                </Grid>
                <Grid item>
                    <ItemList {...this.props}/>
                </Grid>
            </Grid>
        )
    }
}