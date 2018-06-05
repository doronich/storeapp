import React from 'react'
import { ItemList } from './Item'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Filters } from '../Filters'

export class ItemsPage extends React.Component {

    formSubmit = (event)=> (kind,subkind)=> {
        event.preventDefault();
        let sex = ""
        if (this.props.sex === "F") sex = "f";
        else sex = "m";
        this.props.history.push(`/${sex}/items/${kind}/${subkind}`, this.state)
    }

    render() {
        return (
            <Grid container direction="column" justify="center" alignItems="center">

                <Grid item>
                    <Typography align="center" gutterBottom variant="display2" color="primary">Список товаров</Typography>
                </Grid>
                <Grid item style={{ width: "100%" }}>
                    <Filters formSubmit={this.formSubmit}/>
                </Grid>
                <Grid item>
                    <ItemList {...this.props} all={false} />
                </Grid>
            </Grid>
        )
    }
}