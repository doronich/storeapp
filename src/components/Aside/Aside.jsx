import React from 'react';
import { connect } from 'react-redux';
import { ListMenu} from '../List'


const mapStateToProps = state =>{
    return{};
}

class Aside extends React.Component{

    render(){

        return(
            <aside className="mobile900">
                <ListMenu {...this.props}/>
            </aside>
        );
    }
}

const connectedAside= connect(mapStateToProps)(Aside);
export { connectedAside as Aside };