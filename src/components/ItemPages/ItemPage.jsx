import React from 'react'
import { itemService } from '../../services'

import { Grid, Typography, Button } from '@material-ui/core'

export class ItemPage extends React.Component {

    state = {
        name: "",
        mainImage: "",
        image: "",
        image1: "",
        image2: "",
        imgae3: "",
        price: 0,
        color: "",
        size: "",
        description: "",
        brand:""
    }

    componentDidMount() {
        
        const id = parseInt(this.props.match.params.number, 10);
        itemService.getItem(id)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                if (response) {
                    const data = response.data;
                    this.setState({
                        name: data.name,
                        image: data.previewImagePath,
                        image1: data.imagePath1,
                        image2: data.imagePath2,
                        image3: data.imagePath3,
                        price: data.price,
                        color: data.color,
                        size: data.size,
                        brand: data.brand,
                        description: data.description,
                        mainImage: data.previewImagePath,
                    });
                }
            });
    }

    handleClickImage = (number) => (event) => {
        const { image, image1, image2, image3 } = this.state;
        switch (number) {
            case 0: this.setState({ mainImage: image })
                break;
            case 1: this.setState({ mainImage: image1 })
                break;
            case 2: this.setState({ mainImage: image2 })
                break;
            case 3: this.setState({ mainImage: image3 })
                break;
            default: break;
        }
    }

    render() {

        const { name, price, color, size, description, brand } = this.state;

        return (
            <Grid container>
                <Grid item style={{ height: "100%" ,marginTop:"20px"}} xs={12}>
                    <Grid container direction="column" justify="flex-start" alignItems="stretch" style={{ height: "100%" }}>
                        <Grid item >
                            <Grid container direction="row" justify="center" alignItems="stretch">
                                <Grid item className="mobile600">
                                    <Grid container direction="column" justify="flex-start" alignItems="stretch" style={{ height: "250px", marginRight: "20px" }}>
                                        {
                                            this.state.image &&
                                            <Grid item>
                                                <img onClick={this.handleClickImage(0)} src={this.state.image} alt="1" width="37.5px" height="auto" style={{ cursor: "pointer" }} />
                                            </Grid>
                                        }
                                        {
                                            this.state.image1 &&
                                            <Grid item>
                                                <img onClick={this.handleClickImage(1)} src={this.state.image1} alt="2" width="37.5px" height="auto" style={{ cursor: "pointer" }} />
                                            </Grid>
                                        }
                                        {
                                            this.state.image2 &&
                                            <Grid item>
                                                <img onClick={this.handleClickImage(2)} src={this.state.image2} alt="3" width="37.5px" height="auto" style={{ cursor: "pointer" }} />
                                            </Grid>
                                        }
                                        {
                                            this.state.image3 &&
                                            <Grid item >
                                                <img onClick={this.handleClickImage(3)} src={this.state.image3} alt="4" width="37.5px" height="auto" style={{ cursor: "pointer" }} />
                                            </Grid>

                                        }


                                    </Grid>
                                </Grid>
                                <Grid item style={{ width: "600px", marginRight: "20px" }}>
                                    <img src={this.state.mainImage} alt="main" className="photo" style={{ maxHeight: "700px", maxWidth: "600px" }} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="display1" gutterBottom>{name}</Typography>
                                    <Typography variant="title" gutterBottom>{price}р.</Typography>
                                    <Typography variant="button" color="primary" gutterBottom>Бренд: {brand}</Typography>
                                    <Typography variant="button" color="primary" gutterBottom>Цвет: {color}</Typography>
                                    <Typography variant="button" color="primary" gutterBottom>Размер: {size}</Typography>
                                    
                                    <Typography variant="headline" color="primary" gutterBottom>Описание: <br /> {description}</Typography>
                                    <Button variant="raised" color="primary">Добавить в корзину</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item style={{ backgroundColor: "gray" }} ></Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}