import React from 'react'
import debounce from 'lodash/debounce';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputRange from 'react-input-range'
import TextField from '@material-ui/core/TextField';
import 'react-input-range/lib/css/index.css'

import { connect } from 'react-redux';
import { Loc } from 'redux-react-i18n'

import { itemConstants, kinds, subkindsClothing, subkindsFootwear, colors, brandsFootwear,brandsClothing, subkindsAccessories } from '../../constants';

function mapStateToProps(state) {
    const { sex, kind, subkind, brand, color, priceEnd, priceStart, name, currency } = state.item;
    return {
        sex, kind, subkind, brand, color, priceEnd, priceStart, name, currency
    };
}

const mapDispatchToProps = dispatch => ({
    changeKind: (kind) => dispatch({ type: itemConstants.KIND, kind }),
    changeSubkind: (subkind) => dispatch({ type: itemConstants.SUBKIND, subkind }),
    changeBrand: (brand) => dispatch({ type: itemConstants.BRAND, brand }),
    changeColor: (color) => dispatch({ type: itemConstants.COLOR, color }),
    changePriceEnd: (priceEnd) => dispatch({ type: itemConstants.PRICEEND, priceEnd }),
    changePriceStart: (priceStart) => dispatch({ type: itemConstants.PRICESTART, priceStart }),
    changeName: (name) => dispatch({ type: itemConstants.NAME, name }),
    reset: () => dispatch({ type: itemConstants.RESET })
});

class Filters extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            kind: this.props.kind,
            subkind: this.props.subkind,
            brand: this.props.brand,
            color: this.props.color,
            value: {
                min: this.props.priceStart,
                max: this.props.priceEnd
            },
            name: this.props.name,
        }
        
        if(this.props.currency==='rub'){
            this.valuePosfix="р."
            this.valueMultiplier=1;
        }else{
            this.valuePosfix="$"
            this.valueMultiplier=0.5;
        }
    }

    dragEnd = () => {
        this.props.changePriceEnd(this.state.value.max/this.valueMultiplier)
        this.props.changePriceStart(this.state.value.min/this.valueMultiplier)
    }

    reset = async () => {
        await this.props.reset()
        this.setState({
            kind: this.props.kind,
            subkind: this.props.subkind,
            brand: this.props.brand,
            color: this.props.color,
            value: {
                min: this.props.priceStart,
                max: this.props.priceEnd
            },
            name: this.props.name
        })
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        switch (name) {
            case "kind": this.props.changeKind(event.target.value);
                        this.props.changeSubkind("none")
                break;
            case "subkind": this.props.changeSubkind(event.target.value);
                break;
            case "brand": this.props.changeBrand(event.target.value);
                break;
            case "color": this.props.changeColor(event.target.value);
                break;
            default:
                break;
        }
    }
    

    timerId = null;

    searchByName = async (event) => {
        const value = event.target.value;
        await this.setState({ name: value })
        clearTimeout(this.timerId)
        this.timerId = setTimeout(() => {
            this.props.changeName(value)
        }, 700)
    }

    

    render() {
        const changeRange = debounce(value => {
            if (value.min >= 0 && value.max <= 500) this.setState({ value })
        },16);

        const { kind, subkind, brand, color, name } = this.state;

        const tkinds = kinds.map((item, index) => {
            return <MenuItem key={index} value={item.value}><Loc locKey={item.name} /></MenuItem>
        })

        const tcolors = colors.map((item, index) => {
            return <MenuItem key={index} value={item.value}><Loc locKey={item.name} /></MenuItem>
        })

        const tsubkindClothing = subkindsClothing.map((item, index) => {
            return <MenuItem key={index} value={item.value}><Loc locKey={item.name} /></MenuItem>
        })

        const tsubkindFootwear = subkindsFootwear.map((item, index) => {
            return <MenuItem key={index} value={item.value}><Loc locKey={item.name} /></MenuItem>
        })

        const tsubkindAccessories = subkindsAccessories.map((item, index) => {
            return <MenuItem key={index} value={item.value}><Loc locKey={item.name} /></MenuItem>
        })

        const tbrandsFootwear = brandsFootwear.map((item, index) => {
            return <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
        })

        const tbrandsClothing = brandsClothing.map((item, index) => {
            return <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
        })

        if(this.props.currency==='rub'){
            this.valuePosfix="р."
            this.valueMultiplier=1;
        }else{
            this.valuePosfix="$"
            this.valueMultiplier=0.5;
        }

        return (
            <div>
                <hr />
                <Grid id="filtres" container direction={"row"} justify="space-around" alignItems="baseline">

                    <Grid item>
                        <FormControl>
                            <Select
                                value={kind}
                                onChange={this.handleChange("kind")}
                                name="kind"
                            >
                                {tkinds}
                            </Select>
                            <FormHelperText><Loc locKey="filtres.kind" /></FormHelperText>
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
                                    {tsubkindClothing}
                                </Select>
                            }

                            {
                                kind === 1 &&
                                <Select
                                    value={subkind}
                                    onChange={this.handleChange("subkind")}
                                    name="subkind"
                                >
                                    {tsubkindFootwear}
                                </Select>
                            }
                            {
                                kind === 3 &&
                                <Select
                                    value={subkind}
                                    onChange={this.handleChange("subkind")}
                                    name="subkind"
                                >
                                    {tsubkindAccessories}
                                </Select>
                            }

                            <FormHelperText><Loc locKey="filtres.subkind" /></FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl>

                            {
                                kind === 1 &&
                                <Select
                                    value={brand}
                                    onChange={this.handleChange("brand")}
                                    name="brand"
                                >
                                    <MenuItem value="none">
                                        <Loc locKey="filtres.none" />
                                    </MenuItem>
                                    {tbrandsFootwear}
                                </Select>
                            }
                            {
                                kind === 2 &&
                                <Select
                                    value={brand}
                                    onChange={this.handleChange("brand")}
                                    name="brand"
                                >
                                    <MenuItem value="none">
                                        <Loc locKey="filtres.none" />
                                    </MenuItem>
                                    {tbrandsClothing}
                                </Select>
                            }

                            <FormHelperText><Loc locKey="filtres.brand" /></FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl>
                            <Select
                                value={color}
                                onChange={this.handleChange("color")}
                                name="color"
                                MenuProps={{ PaperProps: { style: { maxHeight: "400px" } } }}
                            >
                                {tcolors}
                            </Select>
                            <FormHelperText><Loc locKey="filtres.color" /></FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField
                            fullWidth
                            value={name}
                            onChange={this.searchByName}
                            margin="normal"
                            helperText={<Loc locKey="filtres.searchByName" />}
                        />
                    </Grid>

                    <Grid item style={{ width: "200px" }}>
                        <InputRange
                            formatLabel={value => `${value}${this.valuePosfix}`}
                            step={1}
                            minValue={0}
                            maxValue={500*this.valueMultiplier}
                            value={this.state.value}
                            onChange={changeRange}
                            onChangeComplete={this.dragEnd}
                            
                        />
                    </Grid>
                    <Grid item>
                        <Button onClick={this.reset} variant="raised">
                            <Loc locKey="filtres.reset" />
                        </Button>
                    </Grid>
                </Grid>
                <hr />
            </div>

        )
    }
}


const connectedFilters = connect(mapStateToProps, mapDispatchToProps)(Filters);
export { connectedFilters as Filters };