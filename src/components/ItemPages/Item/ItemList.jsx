import React from 'react'
import { itemService } from '../../../services'
import { connect } from 'react-redux';
import { userConstants } from '../../../constants';

import { Item } from './Item'

import { Grid } from '@material-ui/core'

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch({ type: userConstants.LOGOUT })
})

function mapStateToProps(state) {
    const { sex } = state.item;
    return {
        sex
    };
}


class ItemList extends React.Component {

    state = {
        list: null,
    }


    componentDidMount() {

        if (this.props.all) {
            itemService.getAllItems()
                .catch(err => {
                    console.log("ItemList error:", err);
                })
                .then(response => {

                    if (response) this.setState({ list: response.data })
                })
        } else {

            let reqString = "";
            let sex = ""
            if (this.props.sex === "F") sex = "female";
            else sex = "male";
            reqString = "&sex=" + sex;
            if (this.props.match.params.kind) {

                reqString += "&kind=" + this.props.match.params.kind;
            }
            if (this.props.match.params.subkind) {

                reqString += "&subkind=" + this.props.match.params.subkind;
            }
            itemService.getReqItems(reqString)
                .catch(err => {
                    console.log("reqItemList:", err)
                })
                .then(response => {
                    if (response) this.setState({ list: response.data })
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