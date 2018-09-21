import React from 'react'
import { TextField, List, ListItem, ListItemText, Checkbox, ListItemSecondaryAction } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { Loc } from 'redux-react-i18n'
import { ProductList } from './ProductList';
import { Pagination } from './Pagination';

class Products extends React.Component {

    state = {
        open: false
    }

    render() {
        return (
            <div className="container">
                <div className="product-container">
                    <div className="product-item product-filtres">
                        <div className="filter-item">
                            <TextField
                                fullWidth
                                color="secondary"
                                value={this.props.itemProps.name}
                                onChange={(e) => this.props.changeProp("name", e.target.value)}
                                margin="normal"
                                placeholder="example: nike"
                                helperText={<Loc locKey="filtres.searchByName" />}
                            />
                        </div>
                        <div className="filter-item">
                            <List>
                                <ListItem button >

                                    <ListItemSecondaryAction>
                                        {/*                                        <Checkbox
                                            //checked={false}
                                            disableRipple
                                        //className="checkbox_size"
                                        /> */}
                                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemSecondaryAction>
                                    <ListItemText

                                        primary={<span style={{ fontSize: "12px" }}>Croshdkjasfhldas</span>}
                                    />


                                </ListItem>
                                <ListItem button>
                                    <Checkbox
                                        checked={false}
                                        disableRipple
                                    />
                                    <ListItemText
                                        primary={<span style={{ fontSize: "12px" }}>Clothing</span>}
                                    />

                                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                            </List>
                        </div>
                    </div>
                    {
                        (this.props.itemProps.items && !this.props.itemProps.loading) &&
                        <div className="product-item product-items">
                            <ProductList items={this.props.itemProps.items} />
                            <Pagination
                                hasNext={this.props.itemProps.hasNext}
                                hasPrev={this.props.itemProps.hasPrev}
                                totalPages={this.props.itemProps.total}
                            />
                        </div>
                    }

                </div>
            </div>
        )
    }
}

export { Products }