import {useState, useEffect} from 'react';

import {
    useQuery,
    useMutation
} from 'react-apollo';
import {
    likePost,
    unlikePost,
    getUser
} from '../../querys/graphql.querys'


const useLoved = (...params) => {
    console.log('Entra a use loved');
    
    const [postId, userId, handleLikes] = params;
    const [isLoved, setLoved] = useState(false);

    const userState = useQuery(getUser, {variables:{postId, userId}});
    useEffect(() => {
        if(userState.data && userState.data.user && userState.data.user.postsLoved.length > 0){
            setLoved(true);
        }else{
            setLoved(false);
        }
    }, [userState.data]);
    
    const [postLikerFunc, postLikerState] = useMutation(likePost);
    const [postUnlikerFunc, postUnlikerState] = useMutation(unlikePost);
    
    const changeLovedState = () => {
            if(!isLoved){
                postLikerFunc({variables: {postId, userId}}).then(() => {
                    userState.refetch()
                });
                setLoved(true);
                handleLikes(likes => ++likes);    
            }else{
                postUnlikerFunc({variables: {postId, userId}}).then(() => {
                    userState.refetch()
                });
                setLoved(false);
                handleLikes(likes => --likes);
            }
            
    }
    
    return [isLoved, changeLovedState];

}

export default useLoved;