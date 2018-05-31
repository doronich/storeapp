import React from 'react'
import { itemService } from '../../services'

import { Grid } from '@material-ui/core'

export class ItemPage extends React.Component {

    state = {
        name:"",
        image:""
    }

    componentWillMount() {
        const id = parseInt(this.props.match.params.number, 10);
        itemService.getItem(id)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                if (response) {
                    console.log(response.data)
                    const data = response.data;
                    this.setState({
                        name: data.name,
                        image: data.previewImagePath
                    });
                }
            });
    }

    render() {
        const styles ={
            miniPhotos:{
                height:"50px",
                width:"37.5px",
                border:"1px solid gray"
            }
        }

        const {name} = this.state;

        return (
            <Grid container>
                <Grid item style={{height: "100%" }} xs={12}>
                    <Grid container direction="column" justify="center" alignItems="stretch" style={{ height: "100%" }}>
                        <Grid item style={{ backgroundColor: "white" }} >
                            <Grid container direction="row" justify="center" alignItems="stretch">
                                <Grid item>
                                    <Grid container direction="column" justify="space-between" alignItems="stretch" style={{ height: "250px" }}>
                                        <Grid item>
                                            <img src={this.state.image} alt="" width="37.5px" height="50px"/>
                                        </Grid>
                                        <Grid item style={styles.miniPhotos}>2</Grid>
                                        <Grid item style={styles.miniPhotos}>3</Grid>
                                        <Grid item style={styles.miniPhotos}>4</Grid>
                                    </Grid>
                                </Grid>
                                <Grid item style={{ height: "550px" }}>
                                    <img src={this.state.image} alt="photo" width="500px"/>
                                </Grid>
                                <Grid item>
                                    {name}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item style={{ backgroundColor: "gray" }} >cell2</Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}