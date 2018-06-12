import React from 'react'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import Button from '@material-ui/core/Button';

export class ToUpButton extends React.Component{
    tId=null;
    toTop = () => {
        const top = Math.max(document.body.scrollTop,document.documentElement.scrollTop)
        if(top > 0){
            window.scrollBy(0, -50);
            this.tId = setTimeout(()=>this.toTop(),15);
        }
        else clearTimeout(this.tId);
        return false
    }

    render(){
        const styles={
            button:{
                position:"fixed",
                bottom:"5px",
                right:"10px",
                zIndex:"999"
            }
        }

        return(
            
            <Button variant="fab" color="secondary" aria-label="edit" style={styles.button} onClick={this.toTop}>
                <ArrowUpward/>
            </Button>
        );

    }
}

