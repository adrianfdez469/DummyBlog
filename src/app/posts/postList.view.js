import React from 'react';
import Grid from '@material-ui/core/Grid';

import Post, {SinglePostSkeleto} from './post/singlePost.view';
import FullPost from './fullpost/singleFullPost';
import useFullPost from './fullpost/useFullPost';

const GridItem = props => {
    return <Grid item xs={12}  sm={6} md={4} lg={3}>                    
                {props.children}
            </Grid>
};

const PostList = props => {

    const {fetchPostCount, fetchPosts, authState } = props;
    
    const {fullPostState, closeFullPost, openFullPost } = useFullPost();

    const cant = fetchPostCount.loading ? 1 : fetchPostCount.data.getTotalPosts;

    const skeletos = Array(cant)
                            .fill(<SinglePostSkeleto />, 0, cant)
                            .map((s,i) => <GridItem key={i}>{s}</GridItem>
                    );
    
    
    const posts = fetchPosts.data && fetchPosts.data.posts.map(post =>{
        
        return <GridItem key={post.id}>
                    <Post 
                        authorname={post.author.username}
                        authorAvatarUrl={post.author.avatarUrl}
                        authorPoints={post.authorPoints}
                        postTitle={post.title}
                        postDate={new Date(+post.createdAt).toDateString()}
                        postSummary={post.summaryData.summary}
                        likes={post.pointsData.likes}
                        //dislikes={post.pointsData.dislikes}
                        authState={authState}
                        postId={post.id}
                        handleOpenFullPost={openFullPost}
                    />
                </GridItem>;
    }); 

    return <>
            <Grid container spacing={2}>  
                {fetchPosts.loading ? skeletos : posts}
            </Grid>
            <FullPost open={fullPostState.open} handleClose={closeFullPost} fullPostState={fullPostState}/>
        </>;

}
export default PostList;