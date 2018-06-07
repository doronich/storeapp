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
/*         document.body.scrollTop=0;
        document.documentElement.scrollTop=0; */
    }

    render(){
        const styles={
            button:{
                position:"fixed",
                bottom:"20px",
                right:"10px",
            }
        }

        return(
            
            <Button variant="fab" color="primary" aria-label="edit" style={styles.button} onClick={this.toTop}>
                <ArrowUpward/>
            </Button>
        );

    }
}