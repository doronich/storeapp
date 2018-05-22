import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

function Circular(props) {
  const { classes } = props;
  return (
    <div>
      <CircularProgress className={classes.progress} style={{color:"black"}}/>
    </div>
  );
}

Circular.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Circular);