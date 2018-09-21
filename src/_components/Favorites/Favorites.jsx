import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Linear from "../styles/Linear";
import { FavItem } from './Item'
import { Loc } from "redux-react-i18n";

class Favorites extends React.Component {

    render() {
        const items = this.props.items.map((item, index) => {
            return <Grid item key={index}>
                <FavItem
                    pic={item.previewImagePath}
                    name={item.name}
                    link={`/item/${item.id}`}
                    onclick={() => this.props.deleteFav(this.props.currentUser.id, item.id)}
                /></Grid>;
        })

        return (
            <div>
                <Grid className="fav_font container" container direction="row" justify="flex-start">
                    <Grid item xs={12}>
                        <h1 className="fav-title"><Loc locKey="titles.favs" /></h1>
                        {
                            this.props.loaded ?
                                <hr className="hr-animation hr_black" />
                                : <Linear />
                        }

                    </Grid>
                    {
                        (!this.props.items || this.props.items.length === 0)
                            ?
                            <Grid item xs={12}>
                                <Typography align="center"><Loc locKey="favs.empty" /></Typography>
                            </Grid>
                            : <Grid item xs={12}>
                                <Grid container direction="row" justify="center">
                                    {items}
                                </Grid>
                            </Grid>
                    }

                </Grid>
            </div>
        )
    }
}
export { Favorites }