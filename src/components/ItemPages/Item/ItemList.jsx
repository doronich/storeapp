import React from 'react'
import { itemService } from '../../../services'

import { Item } from './Item'

import { Grid } from '@material-ui/core'

export class ItemList extends React.Component{
    state = {
        list :null
    }

    componentWillMount(){
        itemService.getAllItems()
            .catch(err=>{
                console.log("ItemList error:",err);
            })
            .then(response=>{
                if(response) this.setState({list:response.data})
            })
    }

    handleDeleteItem = (id)=>{
        itemService.deleteItem(id)
            .catch(err=>{
                console.log("Item error:", err);
            })
            .then(response=>{
                this.componentWillMount();
            })

        
    }


    render(){
        const list = this.state.list;
        let listItems=null;
        if(list){
            listItems = this.state.list.map(item=>{
                return<Item key={item.id.toString()} data={item} handleDeleteItem={this.handleDeleteItem} />
            });
        }

        return(
            <Grid container justify="center">
                {listItems}
            </Grid>
        )
    }
}