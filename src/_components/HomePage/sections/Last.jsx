import React from 'react'
import { Item } from './'
import { itemService } from '../../../services'
import { Grid } from '@material-ui/core'


export class Last extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            list:null
        }
    }

    componentDidMount(){
        itemService.getLast(5)
            .catch(err=>{
                console.log(err)
            })
            .then(response=>{
                if(response)this.setState({list:response.data})
            });
    }
    render(){
        let listItems=null
        if(this.state.list){
            listItems = this.state.list.reverse().map((item, index) => {
                return <Item key={item.id} data={item} index={index} />
            });
        }

        return(
            <Grid container direction="row" justify="center" alignItems="stretch">
               {listItems} 
            </Grid>
        );
    }
}