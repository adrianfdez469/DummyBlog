import React , {useState, useRef, useEffect}from 'react';
import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Grid,
    TextField,
    Typography,
    Button,
    Divider,
    FormControlLabel,
    Checkbox
} from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import {useLazyQuery} from 'react-apollo';
import {loginUser} from '../querys/graphql.querys';
import { useAuthContext, authActions } from './useAuthentication';


const View = props => {

    const {title, children, actions, changeAction, otherActionName} = props;

    return (
        <>
            <DialogTitle>
                <Grid container spacing={1} alignItems='stretch'>
                    <Grid item style={{flexGrow:1}}>
                        <Typography >{title}</Typography>
                    </Grid>
                    <Grid item >
                        <Typography color="secondary" style={{cursor:'pointer'}} onClick={changeAction}>{otherActionName}</Typography>
                    </Grid>
                    <Grid item >
                        <CompareArrowsIcon color='secondary' style={{cursor:'pointer'}} onClick={changeAction}/>
                    </Grid>                    
                </Grid>

                <Divider />
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                        {actions}
            </DialogActions>
        </>
    );
}

const Login = props => {

    const {toSignIn, close} = props;
    const userRef = useRef(null);
    const passwordRef = useRef(null);
    const [visibility, setVisibility] = useState(false);

    //const [authState, authDispatcher] = useAuthContext();
    const authDispatcher = useAuthContext()[1];
    
    const [authUserFunc, authUserState] = useLazyQuery(loginUser); 
    

    useEffect(() => {
        if(authUserState.data){
            authDispatcher({
                type: authActions.ON_LOGIN, 
                payload: {
                    email: authUserState.data.login.email,
                    username: authUserState.data.login.username,
                    userId: authUserState.data.login.id,
                    avatarUrl: authUserState.data.login.avatarUrl
                }
            });
            close();
        }
    }, [authUserState, authDispatcher, close]);


    const loginAction = () => {
        const username = userRef.current.value;
        const password = passwordRef.current.value;

        authUserFunc({    
            variables: {username,password}
        });
    }

    return <View 
        title="WHO ARE YOU?"
        actions={<Button variant='text' color="primary" onClick={loginAction}>Login</Button>}
        changeAction={toSignIn}
        otherActionName='Signin'
    >
        <>
            <Grid container spacing={1} alignItems='flex-end'>
                <Grid item>
                    <AccountCircleOutlinedIcon color='primary'/>
                </Grid>
                <Grid item>
                    <TextField 
                        label='Usuario' 
                        inputRef={userRef} 
                        //error={isUserInvalid} 
                        autoFocus 
                        required 
                    />
                </Grid>
            </Grid>
            <Grid container spacing={1} alignItems='flex-end'>
                <Grid item>
                    <VpnKeyOutlinedIcon color='primary'/>
                </Grid>
                <Grid item>
                    <TextField 
                        label='Contraseña' 
                        type={visibility ? 'text' : 'password'} 
                        inputRef={passwordRef} 
                        //error={isPassInvalid} 
                        required
                        //onKeyPress={keyPressInPasswordInput}
                    />
                </Grid>
                <Grid item>
                    {visibility ? <VisibilityIcon onClick={setVisibility.bind(this, false)}/> 
                                : <VisibilityOffIcon onClick={setVisibility.bind(this, true)} /> }
                </Grid>
            </Grid>
            <Grid container spacing={1} alignItems='flex-end'>
                <FormControlLabel
                    control={
                        <Checkbox
                            //checked={state.checkedB}
                            //onChange={handleChange('checkedB')}
                            value="checkedB"
                            color="primary"
                        />
                        /*<Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                            value="checkedI"
                        />*/
                    }
                    label="Remember me"
                />
            </Grid>
        </>
    </View>;
}

const SingIn = props => {

    const {toLogIn} = props;
    const [visibility, setVisibility] = useState(false);


    return <View
        title='JOIN US!'
        actions={<Button variant='text' color="primary" /*onClick={loginAction}*/>SingIn</Button>}
        changeAction={toLogIn}
        otherActionName='Login'
    >
        <Grid container spacing={1} alignItems='flex-end'>
            <Grid item>
                <MailOutlineIcon color='primary'/>
            </Grid>
            <Grid item>
                <TextField 
                    label='Email' 
                    //inputRef={userInputRef} 
                    //error={isUserInvalid} 
                    autoFocus 
                    required 
                />
            </Grid>
        </Grid>
        <Grid container spacing={1} alignItems='flex-end'>
            <Grid item>
                <AccountCircleOutlinedIcon color='primary'/>
            </Grid>
            <Grid item>
                <TextField 
                    label='Username' 
                    //inputRef={userInputRef} 
                    //error={isUserInvalid}  
                    required 
                />
            </Grid>
        </Grid>
        <Grid container spacing={1} alignItems='flex-end'>
            <Grid item>
                <VpnKeyOutlinedIcon color='primary'/>
            </Grid>
            <Grid item>
                <TextField 
                    label='Password' 
                    type={visibility ? 'text' : 'password'} 
                    //inputRef={userPassRef} 
                    //error={isPassInvalid} 
                    required
                    //onKeyPress={keyPressInPasswordInput}
                />
            </Grid>
            <Grid item>
                {visibility ? <VisibilityIcon onClick={setVisibility.bind(this, false)} /> 
                            : <VisibilityOffIcon onClick={setVisibility.bind(this, true)} /> 
                }
            </Grid>
        </Grid>
        <Grid container spacing={1} alignItems='flex-end'>
            <Grid item>
                <VpnKeyOutlinedIcon color='primary'/>
            </Grid>
            <Grid item>
                <TextField 
                    label='Confirm Password' 
                    type={visibility ? 'text' : 'password'} 
                    //inputRef={userPassRef} 
                    //error={isPassInvalid} 
                    required
                    //onKeyPress={keyPressInPasswordInput}
                />
            </Grid>
            <Grid item>
                {visibility ? <VisibilityIcon onClick={setVisibility.bind(this, false)}/> 
                            : <VisibilityOffIcon onClick={setVisibility.bind(this, true)} /> }
            </Grid>
        </Grid>
    </View>;
}


const AuthView = props => {

    const {open, close } = props;
    const [auth, setAuth] = useState(true);
    
    return (
        <>        
            <Dialog open={open} maxWidth='xs' onClose={close} transitionDuration={300}>
                {
                    auth 
                        ? <Login toSignIn={() => setAuth(false)} close={close}/> 
                        : <SingIn toLogIn={() => setAuth(true)} />
                }
            </Dialog>
        </>
    );
}
export default AuthView;