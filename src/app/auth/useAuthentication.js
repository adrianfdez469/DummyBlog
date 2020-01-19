import React, { useReducer, useContext } from 'react';


const authenticationContext = React.createContext(null);

const authActions = {
    ON_SIGNIN: 'ON_SIGNIN',
    ON_LOGIN: 'ON_LOGIN',
    ON_LOGOUT: 'ON_LOGOUT'
};

const initialState = {
    username: null,
    token: null,
    email: null,
    userId: null,
    avatarUrl: null
};

const ON_SIGNIN = (state, payload) => {
    return {
        ...state
    };
}
const ON_LOGIN = (state, payload) => {

    return {
        ...state,
        ...payload
    };
}

const ON_LOGOUT = () => {
    return {
        ...initialState
    };
}


const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case authActions.ON_SIGNIN:
            return ON_SIGNIN(state, action.payload);            
        case authActions.ON_LOGIN:
            return ON_LOGIN(state, action.payload);
        case authActions.ON_LOGOUT:
            return ON_LOGOUT();
        default:
            return state;
    }
}


const AuthenticationProvider = props => {

    const useAuthReducer = useReducer(authReducer,initialState); 
    return <authenticationContext.Provider value={useAuthReducer}>
        {props.children}
    </authenticationContext.Provider>
}

/**
 * @returns [state: {username: String!, token: String!, email: String!, userId: Number!, avatarUrl: String}, dispatchAuth({action: {type: actionType, payload: any}}) : function]
 */
const useAuthContext = () => {

    return useContext(authenticationContext);
}

export {AuthenticationProvider, useAuthContext, authActions};