import React from 'react'
import { itemService } from '../../services'
import { connect } from 'react-redux';
import { Grid, Typography, Button } from '@material-ui/core'
import { Loc } from 'redux-react-i18n';
import { cartAcitons } from '../../actions'
import Slider from 'react-slick'

const mapStateToProps = (state, ownProps) => {
    const currency = state.item.currency

    return {
        currency
    }
}

const mapDispatchToProps = dispatch => ({
    addToCart: id => dispatch(cartAcitons.addItemToCart(id)),
    removeFromCart: id => dispatch(cartAcitons.removeItemFromCart(id))
})

class ItemPage extends React.Component {

    state = {
        active: false,
        id: 0,
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
        brand: "",
        added: false,
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
                        active: data.active,
                        id: data.id,
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

    addToCart = () => {
        this.props.addToCart(this.state.id);
        this.setState({ added: true })
    }
    removeFromCart = () => {
        this.props.removeFromCart(this.state.id);
        this.setState({ added: false })
    }

    render() {

        let valueMultiplier;
        if (this.props.currency === 'rub') {
            valueMultiplier = 1;
        } else {
            valueMultiplier = 0.5;
        }
        const { name, price, color, size, description, brand } = this.state;
        const { image, image1, image2, image3 } = this.state;
        const images = [image, image1, image2, image3];
        const settings = {
            customPaging: function (i) {
                return (
                    <div className="dot-img" style={{
                        backgroundImage: `url("${images[i]}")`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        height: "65px",
                        width: "50px"
                    }}>
                    </div>

                )
            },
            dots: true,
            dotsClass: "slick-dots slick-thumb",
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };


        const list = images.map((item, index) => {
            if (!item) return null;
            return (
                <div key={index} >
                    <div style={{
                        backgroundImage: `url("${item}")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "contain",
                        width: "auto",
                        height: "500px",
                    }}>

                    </div>
                </div>

            )
        });

        document.title = this.state.name

        return (
            <Grid container className="container">
                <Grid item style={{ height: "100%", marginTop: "20px" }} xs={12}>
                    <Grid container direction="column" justify="flex-start" alignItems="stretch" style={{ height: "100%" }}>
                        <Grid item >
                            <Grid id="itempage-container" container direction="row" justify="center" alignItems="flex-start">
                                <Grid item xs={12} sm={12} md={12} lg={6} xl={6} style={{ height: "auto", width: "auto" }}>
                                    <Slider {...settings}>
                                        {
                                            list
                                        }
                                    </Slider>
                                </Grid>
                                {/*  <Grid item style={{ maxWidth: "600px", marginRight: "20px" }}>
                                    <img src={this.state.mainImage} alt={this.state.name} className="photo" style={{ maxHeight: "600px", width: "600px" }} />
                                </Grid>
                                <Grid item className="mobile600">
                                    <Grid container direction="row" justify="flex-start" alignItems="stretch" style={{ height: "250px", marginRight: "20px" }}>
                                        {
                                            this.state.image &&
                                            <Grid item>
                                                <img onClick={this.handleClickImage(0)} src={this.state.image} alt="1" width="37.5px" height="auto" style={{ cursor: "pointer", border: "1px solid gray" }} />
                                            </Grid>
                                        }
                                        {
                                            this.state.image1 &&
                                            <Grid item>
                                                <img onClick={this.handleClickImage(1)} src={this.state.image1} alt="2" width="37.5px" height="auto" style={{ cursor: "pointer", border: "1px solid gray" }} />
                                            </Grid>
                                        }
                                        {
                                            this.state.image2 &&
                                            <Grid item>
                                                <img onClick={this.handleClickImage(2)} src={this.state.image2} alt="3" width="37.5px" height="auto" style={{ cursor: "pointer", border: "1px solid gray" }} />
                                            </Grid>
                                        }
                                        {
                                            this.state.image3 &&
                                            <Grid item >
                                                <img onClick={this.handleClickImage(3)} src={this.state.image3} alt="4" width="37.5px" height="auto" style={{ cursor: "pointer", border: "1px solid gray" }} />
                                            </Grid>

                                        }


                                    </Grid>
                                </Grid> */}
                                <Grid item style={{ marginTop: "100px", marginLeft: "30px" }}>
                                    <Typography variant="title" gutterBottom style={{ width: "320px" }}><span>{name}</span></Typography>
                                    <Typography variant="title" gutterBottom>{price * valueMultiplier}<Loc locKey="currency" /></Typography>
                                    <Typography variant="button" color="secondary" gutterBottom><Loc locKey="item.brand" />: {brand}</Typography>
                                    <Typography variant="button" color="secondary" gutterBottom><Loc locKey="item.color" />: {color}</Typography>
                                    <Typography variant="button" color="secondary" gutterBottom><Loc locKey="item.size" />: {size}</Typography>

                                    <Typography variant="headline" color="secondary" style={{ width: "320px" }} gutterBottom><Loc locKey="item.desc" />:</Typography>
                                    <Typography variant="subheading" style={{ width: "320px" }}>{description}</Typography>
                                    {
                                        this.state.added
                                            ? <Button variant="raised" color="secondary" onClick={this.removeFromCart}><Loc locKey="item.remove" /></Button>
                                            : <Button variant="raised" color="secondary" disabled={!this.state.active} onClick={this.addToCart}><Loc locKey="item.add" /></Button>
                                    }
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

const connectedItemPage = connect(mapStateToProps, mapDispatchToProps)(ItemPage);
export { connectedItemPage as ItemPage };