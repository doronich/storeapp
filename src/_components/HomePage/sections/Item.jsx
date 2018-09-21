import React from 'react'

import {Card,CardMedia, Typography,CardContent} from '@material-ui/core';
import { Link } from 'react-router-dom';


const styles = {
    card: {
        width: 250,
        height:350,
        //margin: "0 15px 15px 15px",
        backgroundColor: "#fff",
        transform: "scale(0.75)",
    },
    media: {
        height: 280,
        width: "auto"
        //paddingTop: '350px', // 16:9
        //paddingRight: '300px'
    },
};

export class Item extends React.Component {

    render() {

        return (
            <Link to={"/item/" + this.props.data.id}  className="card-scale">
                <Card style={styles.card} raised evelation={0}>
                    <CardMedia
                        style={styles.media}
                        image={this.props.data.image}
                        title={this.props.data.name}
                        />
                    <CardContent>
                        <Typography align="center"  variant="subheading" >
                            {this.props.data.name}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        )
    }
}

