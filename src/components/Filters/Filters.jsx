import  React from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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

export class Filters extends React.Component {

    state={
        sex:0,
        kind:0,
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }
    
    render() {

        const {sex,kind} = this.state;
        return (
            <Grid container direction="row" justify="space-around">
                <Grid item>
                    <FormControl>
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
                </Grid>
                <Grid item>
                    <FormControl>
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
                </Grid>
                <Grid item>

                </Grid>
            </Grid>


        )
    }
}