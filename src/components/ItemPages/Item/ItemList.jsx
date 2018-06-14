import React from 'react'
import { itemService } from '../../../services'
import { connect } from 'react-redux';
import { userConstants } from '../../../constants';

import { Item } from './Item'

import { Grid } from '@material-ui/core'

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch({ type: userConstants.LOGOUT }),
})

function mapStateToProps(state) {
    const { sex, kind, subkind, brand, color,priceEnd, priceStart, name } = state.item;
    return {
        sex, kind, subkind, brand, color, priceEnd, priceStart, name
    };
}


class ItemList extends React.Component {

    state = {
        list: null,
        changed: this.props.changed,
        currentPage:null
    }

    static getDerivedStateFromProps(props, state) {
        return {
            changed: props.changed
        }
    }

    componentDidUpdate() {
        this.listHandler()
    }

    componentDidMount() {
        this.listHandler()
    }

    listHandler = () => {
        if (this.state.changed === true) return;
        if (this.props.all) {
            itemService.getAllItems()
                .catch(err => {
                    console.log("ItemList error:", err);
                })
                .then(response => {

                    if (response) this.setState({ list: response.data, changed: true })
                })
        } else {

            let reqString = "";
            let sex = ""
            if (this.props.sex === "F") sex = "female";
            else sex = "male";
            reqString = `sex=${sex}`;
            if (this.props.kind !== "none") {

                reqString += "&kind=" + this.props.kind;
            }
            if (this.props.subkind !== "none") {

                reqString += "&subkind=" + this.props.subkind;
            }
            if (this.props.brand !== "none") {
                reqString += "&brand=" + this.props.brand
            }
            if (this.props.color !== "none") {
                reqString += "&color=" + this.props.color
            }
            if(this.props.name){
                reqString +="&name="+this.props.name;
            }

            reqString += "&startPrice="+this.props.priceStart;
            reqString += "&endPrice="+this.props.priceEnd;
            reqString += "&pageIndex="+1;
            reqString += "&pageSize="+12;
            console.log("string", reqString);

            itemService.getReqItems(reqString)
                .catch(err => {
                    console.log("reqItemList:", err)
                })
                .then(response => {
                    console.log(response)
                    if (response) this.setState({ list: response.data.res, changed: true })
                })
        }
    }


    handleDeleteItem = (id, index) => {
        itemService.deleteItem(id)
            .catch(err => {
                if (err.message.indexOf("401") >= 0) {
                    this.props.logOut();
                }
            })
            .then(response => {
                if (response) {
                    const list = Object.assign([], this.state.list)
                    list.splice(index, 1);
                    this.setState({ list: list });
                }
            })
    }


    render() {
        const { list } = this.state;
        let listItems = null;
        if (list) {
            listItems = this.state.list.map((item, index) => {
                return <Item key={item.id} data={item} index={index} handleDeleteItem={this.handleDeleteItem} />
            });
        }

        return (
            <Grid container justify="center">
                {listItems}
            </Grid>
        )
    }
}

const connectedItemList = connect(mapStateToProps, mapDispatchToProps)(ItemList);
export { connectedItemList as ItemList };