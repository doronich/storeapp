import React from 'react'

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
import { connect } from 'react-redux';

import { itemConstants } from '../../constants';

function mapStateToProps(state) {
    const { sex, kind, subkind } = state.item;
    return {
        sex, kind, subkind
    };
}

const mapDispatchToProps = dispatch => ({
    changeKind:(kind)=>dispatch({type:itemConstants.KIND,kind}),
    changeSubkind:(subkind)=>dispatch({type:itemConstants.SUBKIND,subkind})
});

class Filters extends React.Component {

    state={
        kind: this.props.kind,
        subkind:this.props.subkind,
        brand: "",
        color: "",
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        if(name==="kind")this.props.changeKind(event.target.value);
        if(name==="subkind")this.props.changeSubkind(event.target.value);
    }

    render() {
        const { kind, subkind } = this.state;
        return (
            <div>
                <hr />
                <form onSubmit={this.props.formSubmit(kind,subkind)}>
                    <Grid container direction="row" justify="space-around" alignItems="center">
                        <Grid item>

                        </Grid>
                        <Grid item>
                            <FormControl>
                                <Select
                                    value={kind}
                                    onChange={this.handleChange("kind")}
                                    name="kind"
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


                            <FormControl>
                                {
                                    kind === 2 &&
                                    <Select
                                        value={subkind}
                                        onChange={this.handleChange("subkind")}
                                        name="subkind"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="верхняя одежда">Верхняя одежда</MenuItem>
                                        <MenuItem value="брюки">Брюки</MenuItem>
                                        <MenuItem value="джинсы">Джинсы</MenuItem>
                                        <MenuItem value="футболки">Футболки</MenuItem>
                                        <MenuItem value="шорты">Шорты</MenuItem>
                                        <MenuItem value="толстовки">Толстовки</MenuItem>
                                    </Select>
                                }

                                {
                                    kind === 1 &&
                                    <Select
                                        value={subkind}
                                        onChange={this.handleChange("subkind")}
                                        name="subkind"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="Кроссовки">Кроссовки</MenuItem>
                                        <MenuItem value="Кеды">Кеды</MenuItem>
                                        <MenuItem value="туфли">туфли</MenuItem>
                                    </Select>
                                }

                                <FormHelperText>Вид</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <Button
                                type="submit"
                                variant="raised"
                                size="large"
                                color="primary"
                            >
                                Поиск
                        </Button>
                        </Grid>
                    </Grid>
                </form>
                <hr />
            </div>

        )
    }
}


const connectedFilters = connect(mapStateToProps,mapDispatchToProps)(Filters);
export { connectedFilters as Filters };