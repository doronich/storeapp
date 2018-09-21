import React from 'react'
import { ItemList } from './Item'

import Grid from '@material-ui/core/Grid';
//import Typography from '@material-ui/core/Typography';
import { Filters } from '../Filters'
//import { Loc } from 'redux-react-i18n'

export class ItemsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            changed: false
        }
    }

    render() {
        document.title = "Store"
        return (
            <Grid container className="container" direction="column" justify="flex-start" alignItems="center" style={{ height: "100%" }}>
                <Grid item>
                    <Filters />
                </Grid>
                <Grid item>
                    <ItemList all={false} {...this.props} />
                </Grid>
            </Grid>
        )
    }
}