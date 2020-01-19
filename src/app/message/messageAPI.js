import React, {useState} from 'react';

import clsx from 'clsx';

import {
    Snackbar,
    Button,
    IconButton,
    SnackbarContent,
    makeStyles,
    Slide
} from '@material-ui/core';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import WarningIcon from '@material-ui/icons/Warning';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };
  
  const useStyles1 = makeStyles(theme => ({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
      backgroundColor: theme.palette.primary.light,
    },
    warning: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
  }));

const MySnackbarContentWrapper = (props) => {
    const classes = useStyles1();
    const { className, message, onClose, variant, ...other } = props;
    
    const Icon = variantIcon[variant];
  
    return (
      <SnackbarContent
        className={clsx(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
        {...other}
      />
    );
}

const Message = props => {

    const {
        message,
        variant,
        open,
        handleClose
    } = props;

    return <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={6000}
            open={open}
            onClose={handleClose}
      >
        <MySnackbarContentWrapper
            onClose={handleClose}
            variant={variant}
            message={message}

        />
      </Snackbar>
}

const useMessage = () => {

    const initialState = {open: false, message: null, variant: 'success'};
    const [state, setState] = useState(initialState);

    const setMessage = (msg, variant = "success") => {
        if(msg && msg !== ''){
            setState({open: true, message: msg, variant: variant});
        }/*else{

            setState(initialState);
        }*/
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setState(state => ({
           ...initialState,
           variant: state.variant 
        }));
      };

    const cmpMsg = <Message 
        open={state.open} 
        message={state.message}
        variant={state.variant} 
        handleClose={handleClose}        
    />;

    return [cmpMsg, setMessage];

}
export { useMessage };