import React from 'react'
import { itemService } from '../../../services'
import { connect } from 'react-redux';
import { userConstants } from '../../../constants';

import { Item } from './Item'

import { Grid } from '@material-ui/core'

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch({ type: userConstants.LOGOUT })
})


class ItemList extends React.Component {

        state = {
            list: null,
        }




    componentDidMount() {
        let reqString = {};
        if(this.props.match){
            const params = this.props.match.params;
            console.log(params)
            
            if (params) {
                const sex = params.sex, kind = params.kind, subkind = params.subkind;
                if (sex) reqString = "&sex=" + sex;
                if (kind) reqString = reqString + "&kind=" + kind;
                if (subkind) reqString = reqString+ "&subkind="+subkind;
    
            }
        }

        console.log("string", reqString)
        if (!reqString) {
            itemService.getAllItems()
                .catch(err => {
                    console.log("ItemList error:", err);
                })
                .then(response => {
                    //console.log(response)
                    if (response) this.setState({ list: response.data })
                })
        } else {
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
        const {list} = this.state;
        console.log(this.state)
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

const connectedItemList = connect(() => ({}), mapDispatchToProps)(ItemList);
export { connectedItemList as ItemList };