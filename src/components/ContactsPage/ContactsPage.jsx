import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography'


const mapStateToProps = state =>{
    return{};
}

class ContactsPage extends React.Component{

    render(){

        return(
            <div style={{overflow:"hidden"}}>
                    <Typography variant="display4">Contacts</Typography>

                
            </div>
        );
    }
}

const connectedContactsPage= connect(mapStateToProps)(ContactsPage);
export { connectedContactsPage as ContactsPage };