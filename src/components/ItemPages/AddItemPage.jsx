import React from 'react'
import { itemService } from '../../services'
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Circular from '../styles/Circular';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import { ValidatorForm } from 'react-material-ui-form-validator'
import { FormControlLabel } from '@material-ui/core';

function mapStateToProps(state) {
    const { currentUser } = state.authentication;
    return {
        currentUser
    };
}

class AddItemPage extends React.Component {

    state = {
        name: "",
        description: "",
        checkedActive: true,
        color: "",
        brand: "",
        price: 0,
        discount: 0,
        kind: 2,
        subkind: "",
        sex: 1,
        status: 0,
        amount: 0,
        size: "",
        image: "",
        image1: "",
        image2: "",
        image3: "",
        errorMessage: "",
        okMessage: "",
        loading: false
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }
    handleChangeBool = name => event => {
        this.setState({ [name]: event.target.checked });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true })
        const { image, image1, image2, image3, name, description, checkedActive, color, brand, price, discount, kind, subkind, sex, status, amount, size } = this.state;
        const obj = {
            createdBy:this.props.currentUser.username,
            name: name.trim(),
            description:description.trim(),
            Active: checkedActive,
            color:color.trim(),
            brand:brand.trim(),
            price,
            discount,
            kind,
            subkind:subkind.trim(),
            sex,
            status,
            amount,
            size,
            previewImagePath: image !== null ? image : null,
            imagePath1: image1 !== null ? image1 : null,
            imagePath2: image2 !== null ? image2 : null,
            imagePath3: image3 !== null ? image3 : null

        }
        console.log(obj);

        itemService.addItem(obj)
            .catch(err => {
                this.setState({ errorMessage: err.toString(), loading: false })
                this.loadTimeout=setTimeout(() => {
                    this.setState({ errorMessage: "" })
                }, 5000);

            })
            .then(response => {
                if(response){
                    this.setState({okMessage: response.statusText})
                }
                console.log('resp', response)
                this.setState({ loading: false })
                this.loadTimeout=setTimeout(() => {
                    this.setState({ okMessage: "" })
                }, 5000);
            })

    }

    loadTimeout;//задержка сообщения ответа от сервера
    componentWillUnmount(){

        this.loadTimeout && clearTimeout(this.loadTimeout);
    }

    encodeImageFileAsURL = (number) => (event) => {

        const file = event.target.files[0];

        console.log('file', file);
        var reader = new FileReader();
        reader.onloadend = () => {
            switch (number) {
                case 0: this.setState({ image: reader.result });
                    break;
                case 1: this.setState({ image1: reader.result })
                    break;
                case 2: this.setState({ image2: reader.result })
                    break;
                case 3: this.setState({ image3: reader.result })
                    break;
                default:
                    break;
            }
        }
        reader.readAsDataURL(file);

    }

    render() {
        const { name, description, checkedActive, color, brand, price, discount, kind, subkind, sex, status, amount, size, errorMessage, okMessage, loading } = this.state;
        const styles = {
            exampleImageInput: {
                cursor: 'pointer',
                position: 'absolute',
                top: '0',
                bottom: '0',
                right: '0',
                left: '0',
                width: '100%',
                opacity: '0'
            }
        }

        return (
            <Grid container>
                <Grid item xs={8} md={6}>
                    <ValidatorForm onSubmit={this.handleSubmit}>
                        <Typography align="center" variant='display1' color="primary">Добавить предмет</Typography>
                        <TextField
                            fullWidth
                            label="Название"
                            value={name}
                            onChange={this.handleChange("name")}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Описание"
                            value={description}
                            onChange={this.handleChange("description")}
                            margin="normal"
                            multiline
                        />
                        <TextField
                            fullWidth
                            label="Цвет"
                            value={color}
                            onChange={this.handleChange("color")}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Бренд"
                            value={brand}
                            onChange={this.handleChange("brand")}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Цена"
                            value={price}
                            onChange={this.handleChange("price")}
                            margin="normal"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">бел. руб.</InputAdornment>
                            }}
                            type="number"
                        />
                        <TextField
                            fullWidth
                            label="Скидка"
                            value={discount}
                            onChange={this.handleChange("discount")}
                            margin="normal"
                            helperText="15 = 15%; 0 = 0%"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">%</InputAdornment>
                            }}
                            type="number"
                        />
                        <FormControl fullWidth>
                            <Select
                                value={kind}
                                onChange={this.handleChange("kind")}

                            >
                                <MenuItem value={2}>Одежда</MenuItem>
                                <MenuItem value={1}>Обувь</MenuItem>
                                <MenuItem value={3}>Аксесуары</MenuItem>
                                <MenuItem value={0}>Другое</MenuItem>
                            </Select>
                            <FormHelperText>Вид</FormHelperText>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Подвид"
                            value={subkind}
                            onChange={this.handleChange("subkind")}
                            margin="dense"
                        />
                        <FormControl fullWidth margin="normal">
                            <Select
                                value={sex}
                                onChange={this.handleChange("sex")}
                                displayEmpty
                            >
                                <MenuItem value={0}>Унисекс</MenuItem>
                                <MenuItem value={1}>Мужской</MenuItem>
                                <MenuItem value={2}>Женский</MenuItem>
                            </Select>
                            <FormHelperText>Пол</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <Select
                                value={status}
                                onChange={this.handleChange("status")}
                                displayEmpty
                            >
                                <MenuItem value={0}>Обычный</MenuItem>
                                <MenuItem value={1}>Новый</MenuItem>
                                <MenuItem value={2}>Со скидкой</MenuItem>
                            </Select>
                            <FormHelperText>Статус</FormHelperText>
                        </FormControl>


                        <TextField
                            fullWidth
                            label="Размер"
                            value={size}
                            onChange={this.handleChange("size")}
                            margin="dense"
                        />
                        <TextField
                            fullWidth
                            label="Количество"
                            value={amount}
                            onChange={this.handleChange("amount")}
                            margin="dense"
                            type="number"
                        />

                        <Button color="primary" variant="outlined" size="large">
                            <input type="file" style={styles.exampleImageInput} onChange={this.encodeImageFileAsURL(0)} accept="image/*" id="imageButton" />
                            Выбрать главное изображение
                                </Button>
                        <br />

                        <Button color="primary" variant="outlined" size="large">
                            <input type="file" style={styles.exampleImageInput} onChange={this.encodeImageFileAsURL(1)} accept="image/*" id="imageButton" />
                            Выбрать 1 изображение
                                </Button>
                        <br />

                        <Button color="primary" variant="outlined" size="large">
                            <input type="file" style={styles.exampleImageInput} onChange={this.encodeImageFileAsURL(2)} accept="image/*" id="imageButton" />
                            Выбрать 2 изображение
                                </Button>
                        <br />

                        <Button color="primary" variant="outlined" size="large">
                            <input type="file" style={styles.exampleImageInput} onChange={this.encodeImageFileAsURL(3)} accept="image/*" id="imageButton" />
                            Выбрать 3 изображение
                                </Button>
                        <br />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={checkedActive}
                                    onChange={this.handleChangeBool('checkedActive')}
                                    value="checkedActive"
                                />
                            }
                            label="Доступен?"
                        />
                        <br />


                        <Grid align="center">
                            {
                                loading ? <Circular />
                                    : <Button type="submit" xs={12} variant="raised" size="large" color="primary" style={{ margin: "10px auto" }}>
                                        Добавить
                                    </Button>

                            }


                        </Grid>

                        {
                            errorMessage && <Typography align="center" variant="caption" color="error">{errorMessage}</Typography>
                        }
                        {
                            okMessage && <Typography align="center" variant="caption" style={{ color: "#84d175" }}>{okMessage}</Typography>
                        }

                        <img src={this.state.image} alt="item" style={{ width: "400px" }} />
                        {
                            this.state.image1 && <img src={this.state.image1} alt="item" style={{ width: "400px" }} />
                        }
                        {
                            this.state.image2 && <img src={this.state.image2} alt="item" style={{ width: "400px" }} />
                        }
                        {
                            this.state.image3 && <img src={this.state.image3} alt="item" style={{ width: "400px" }} />
                        }
                    </ValidatorForm>
                </Grid>
            </Grid>
        );
    }
}

const connectedAddItemPage = connect(mapStateToProps)(AddItemPage);
export { connectedAddItemPage as AddItemPage };