import React, { useEffect } from 'react';

import PostListView from './postList.view';

import { useQuery, useLazyQuery } from 'react-apollo';
import { getPosts, getTotalPosts } from '../querys/graphql.querys';
import { useAuthContext } from '../auth/useAuthentication';

const PostListController = props => {

    const fetchPostCount = useQuery(getTotalPosts)
    const fetchPosts = useQuery(getPosts);

    const [authState] = useAuthContext();
    
    const refetch = fetchPosts.refetch;
    
    useEffect(() => {
        refetch();
    },[authState, refetch]);
    


    return <PostListView 
        fetchPostCount={fetchPostCount}
        fetchPosts={fetchPosts}
        authState={authState}   
    />;
}


export default PostListController;