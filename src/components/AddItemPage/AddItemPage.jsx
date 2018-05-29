import React from 'react'
import {itemService} from '../../services'

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

export class AddItemPage extends React.Component {

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
        selectedFile: null,
        errorMessage:"",
        okMessage:"",
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
        this.setState({loading:true})
        const { name, description, checkedActive, color, brand, price, discount, kind, subkind, sex, status, amount, size,selectedFile } = this.state;
        const obj={
            name,
            description,
            Active: checkedActive,
            color,
            brand,
            price,
            discount,
            kind,
            subkind,
            sex,
            status,
            amount,
            size,
            image: selectedFile,
            
        }
        console.log(obj);
 
        itemService.addItem(obj)
        .catch(err => {
            this.setState({errorMessage:err.toString(),loading:false})
            setTimeout(()=>{
                this.setState({errorMessage:""})
            },5000);
            
            return err;
        })
        .then(response => {
            console.log('resp',response)
            this.setState({okMessage:response.statusText,loading:false})
            setTimeout(()=>{
                this.setState({okMessage:""})
            },5000);
            
            return response.data;
        })

    }

    encodeImageFileAsURL = (event)=>{

        const file = event.target.files[0];
        
        console.log('file',file);
        var reader = new FileReader();
        reader.onloadend = ()=> {
            this.setState({selectedFile:reader.result})
        }
        reader.readAsDataURL(file);

    }

    render() {
        const { name, description, checkedActive, color, brand, price, discount, kind, subkind, sex, status, amount, size, errorMessage,okMessage, loading } = this.state;
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
                                <MenuItem value={4}>Другое</MenuItem>
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
                            <input type="file" style={styles.exampleImageInput} onChange={this.encodeImageFileAsURL} accept="image/*" id="imageButton" />
                            Выбрать изображение
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
                                loading?<Circular />
                                    :<Button type="submit" xs={12} variant="raised" size="large" color="primary" style={{ margin: "10px auto" }}>
                                        Добавить
                                    </Button>

                            }
                            
                            
                        </Grid>
                        
                        {
                            errorMessage && <Typography align="center" variant="caption" color="error">{errorMessage}</Typography>
                        }
                        {
                            okMessage && <Typography align="center" variant="caption" style={{color:"#84d175"}}>{okMessage}</Typography>
                        }
                    </ValidatorForm>
                </Grid>
            </Grid>
        );
    }
}

