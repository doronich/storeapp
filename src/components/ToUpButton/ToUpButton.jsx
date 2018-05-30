import React from 'react'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import Button from '@material-ui/core/Button';

export class ToUpButton extends React.Component{

    toTop = () => {
        document.body.scrollTop=0;
        document.documentElement.scrollTop=0;
    }

    render(){
        const styles={
            button:{
                position:"fixed",
                bottom:"20px",
                right:"30px",
            }
        }

        return(
            
            <Button variant="fab" color="primary" aria-label="edit" style={styles.button} onClick={this.toTop}>
                <ArrowUpward/>
          </Button>
        );

    }
}