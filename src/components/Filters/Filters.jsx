import React from 'react'

import { Manager, Reference, Popper } from 'react-popper';

import Slider from '@material-ui/lab/Slider'

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import { connect } from 'react-redux';

import { itemConstants } from '../../constants';

function mapStateToProps(state) {
    const { sex, kind, subkind, brand, color, priceEnd } = state.item;
    return {
        sex, kind, subkind, brand, color, priceEnd
    };
}

const mapDispatchToProps = dispatch => ({
    changeKind: (kind) => dispatch({ type: itemConstants.KIND, kind }),
    changeSubkind: (subkind) => dispatch({ type: itemConstants.SUBKIND, subkind }),
    changeBrand: (brand) => dispatch({ type: itemConstants.BRAND, brand }),
    changeColor: (color) => dispatch({ type: itemConstants.COLOR, color }),
    changePriceEnd: (priceEnd) => dispatch({type: itemConstants.PRICEEND, priceEnd})
});

class Filters extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            kind: this.props.kind,
            subkind: this.props.subkind,
            brand: this.props.brand,
            color: this.props.color,
            priceEnd: this.props.priceEnd
        }
    }

    dragEnd = () =>{
        this.props.changePriceEnd(this.state.priceEnd)
    }

    handleChangeSlider = (event, value) => {
        this.setState({ priceEnd: value })
    }

    handleChange = name => event => {
        this.setState({ [name]: parseInt(event.target.value, 10) });

        switch (name) {
            case "kind": this.props.changeKind(event.target.value);
                break;
            case "subkind": this.props.changeSubkind(event.target.value);
                break;
            case "brand": this.props.changeBrand(event.target.value);
                break;
            case "color": this.props.changeColor(event.target.value);
                break;
        }
    }

    render() {
        const { kind, subkind, brand, color, priceEnd } = this.state;
        return (
            <div>
                <hr />
                <form >
                    <Grid container direction="row" justify="space-around" alignItems="center">

                        <Grid item>

                            <FormControl>
                                <Select
                                    value={kind}
                                    onChange={this.handleChange("kind")}
                                    name="kind"
                                >
                                    <MenuItem value="none">
                                        <em>None</em>
                                    </MenuItem>
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
                                        <MenuItem value="none">
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
                                        <MenuItem value="none">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="кроссовки">Кроссовки</MenuItem>
                                        <MenuItem value="кеды">Кеды</MenuItem>
                                    </Select>
                                }

                                <FormHelperText>Подвид</FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid item>
                            <FormControl>
                                <Select
                                    value={brand}
                                    onChange={this.handleChange("brand")}
                                    name="brand"
                                >
                                    <MenuItem value="none">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Adidas">Adidas</MenuItem>
                                    <MenuItem value="Nike">Nike</MenuItem>
                                    <MenuItem value="Puma">Puma</MenuItem>
                                    <MenuItem value="Kappa">Kappa</MenuItem>
                                    <MenuItem value="FILA">FILA</MenuItem>
                                    <MenuItem value="Umbro">Umbro</MenuItem>
                                    <MenuItem value="The North Face">The North Face</MenuItem>
                                    <MenuItem value="Reebok">Reebok</MenuItem>
                                </Select>
                                <FormHelperText>Бренд</FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid item>
                            <FormControl>
                                <Select
                                    value={color}
                                    onChange={this.handleChange("color")}
                                    name="color"
                                >

                                    <MenuItem value="none">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="белый">белый</MenuItem>
                                    <MenuItem value="черный">черный</MenuItem>
                                    <MenuItem value="серый">серый</MenuItem>
                                    <MenuItem value="красный">красный</MenuItem>
                                    <MenuItem value="синий">синий</MenuItem>
                                    <MenuItem value="желтый">желтый</MenuItem>
                                    <MenuItem value="зеленый">зеленый</MenuItem>
                                    <MenuItem value="розовый">розовый</MenuItem>
                                </Select>
                                <FormHelperText>Цвет</FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid item style={{ width: "150px" }}>
                            <Slider aria-labelledby="label" onChange={this.handleChangeSlider} value={priceEnd} min={0} step={1} max={999} onDragEnd={this.dragEnd}/>
                            <Typography>Цена до {priceEnd} р.</Typography>
                        </Grid>
                    </Grid>
                </form>
                <hr />
            </div>

        )
    }
}


const connectedFilters = connect(mapStateToProps, mapDispatchToProps)(Filters);
export { connectedFilters as Filters };