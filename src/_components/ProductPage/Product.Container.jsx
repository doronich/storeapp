import React from "react";
import { connect } from 'react-redux'
import { itemActions } from "../../actions";
import { Products } from "./Products";
import './style.css'

class ProductContainer extends React.Component {

    componentDidMount() {
        this.props.getItems()
    }

    render() {
        return (
            <Products
                itemProps={this.props.itemProps}
                getItems={this.props.getItems}
                changeProp={this.props.changeProp}
            />
        )
    }
}

const mapStateToProps = state => {
    const itemProps = { ...state.item };
    return {
        itemProps
    };
}

const mapDispatchToProps = dispatch => ({
    getItems: (params) => dispatch(itemActions.getItems(params)),
    changeProp: (name, value) => dispatch(itemActions.changeProp(name, value))
});

const connectedProductContainer = connect(mapStateToProps, mapDispatchToProps)(ProductContainer);
export { connectedProductContainer as ProductContainer }