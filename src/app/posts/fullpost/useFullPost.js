import React, {useReducer, useCallback} from 'react';

import FullSinglePost from './singleFullPost';

const initialState = {
    open: false,
    postId: null,
    authorname: null,
    authorAvatarUrl: null,
    authorPoints: null,
    postTitle: null,
    postDate: null,
    postSummary: null,
    likes: null,
    authState: null
};

const OPEN_POST = (state, payload) => {
    return {
        ...state,
        open: true,
        ...payload
    }
}

const CLOSE_POST = () => {
    return initialState;
}

const fullPostReducer = (state, action) => {
    switch (action.type) {
        case fullPostActions.OPEN_POST:
            return OPEN_POST(state, action.payload);   
        case fullPostActions.CLOSE_POST:
            return CLOSE_POST(); 
        default:
            return state;
    }
}

const fullPostActions = {
    OPEN_POST: 'OPEN_POST',
    CLOSE_POST: 'CLOSE_POST',

};

const useFullPost = () => {

    const [fullPostState, dispatcher] = useReducer(fullPostReducer, initialState);

    const openFullPost = useCallback((postId, authorname,
                authorAvatarUrl,
                authorPoints,
                postTitle,
                postDate,
                postSummary,
                likes,
                authState) => {
        dispatcher({
            type: fullPostActions.OPEN_POST, 
            payload: {
                postId,
                authorname,
                authorAvatarUrl,
                authorPoints,
                postTitle,
                postDate,
                postSummary,
                likes,
                authState
            }});
        
    }, []);

    const closeFullPost = useCallback(() => {
        dispatcher({
            type: fullPostActions.CLOSE_POST
        });
    }, []);

    return {
        fullPostState,
        openFullPost,
        closeFullPost
    }
    
}

export default useFullPost;