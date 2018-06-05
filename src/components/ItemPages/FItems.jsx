import React from 'react'
import {ItemsPage} from './'

export class FItems extends React.Component{

    render(){
        return(
            <div>
                <ItemsPage {...this.props} />
            </div>
        )
    }
}