import React from 'react'
import { itemService } from '../../../services'
import { connect } from 'react-redux';
import { userConstants } from '../../../constants';

import { Item } from './Item'

import { Grid } from '@material-ui/core'

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch({ type: userConstants.LOGOUT })
})



class ItemList extends React.Component{
    state = {
        list :[]
    }

    componentWillMount(){
        itemService.getAllItems()
            .catch(err=>{
                console.log("ItemList error:",err);
            })
            .then(response=>{
                console.log(response)
                if(response) this.setState({list:response.data})
            })
    }

    handleDeleteItem = (id,index)=>{
        itemService.deleteItem(id)
            .catch(err=>{
                if(err.message.indexOf("401")>=0){
                    this.props.logOut();
                }
            })
            .then(response=>{
                if(response){
                    const list = Object.assign([], this.state.list)
                    list.splice(index,1);
                    this.setState({list:list});
                }
            })
    }


    render(){
        const list = this.state.list;
        let listItems=null;
        if(list){
            listItems = this.state.list.map((item, index)=>{
                return<Item key={item.id} data={item} index={index} handleDeleteItem={this.handleDeleteItem} />
            });
        }

        return(
            <Grid container justify="center">
                {listItems}
            </Grid>
        )
    }
}

const connectedItemList = connect(mapDispatchToProps)(ItemList);
export { connectedItemList as ItemList};