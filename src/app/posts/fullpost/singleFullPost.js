import React from 'react';

import {
    withStyles,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    makeStyles,
    Slide,
    Avatar,
    Badge,
    Paper,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Container
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';

import Skeleton from '@material-ui/lab/Skeleton'

import {useQuery} from 'react-apollo';
import { getFullPost } from '../../querys/graphql.querys';

const useStyles = makeStyles(theme => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      //flex: 1,
    },
    author: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    content: {      
      boxSizing: 'content-box',      
      margin: '1rem 2rem',
      padding: '1rem 2rem'
    },
    comments: {
      boxSizing: 'content-box',      
      margin: '1rem 4rem',
      padding: '1rem 2rem'
    },
    divider: {
      margin: '1rem 0'
    },
    actions: {
      alignItems: 'center',
      display: 'flex'      
    },
    actionBtn: {
      marginLeft: 5
    }
  }));
  
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const StyledBadge = withStyles(theme => ({
  badge: {
    right: 18,
    top:  45,
    
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    backgroundColor: '#81c784',
    color: 'white'
  },
}))(Badge);

const SingleFullPostDialog = props => {
  
  return <Dialog fullScreen {...props} TransitionComponent={Transition} >
    {props.open && <SingleFullPost {...props} />}
  </Dialog>

}

const SingleFullPost = props => {

    const {handleClose, fullPostState} = props;

    const {
      postId,
      authorname,
      authorAvatarUrl,
      authorPoints,
      postTitle,
      postDate,
      postSummary,
      likes,
      authState
    } = fullPostState;

    const classes = useStyles();
    
    const fetchFullPostData = useQuery(getFullPost, {variables: {postId}})

    return (
        <Container>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <StyledBadge badgeContent={authorPoints+'\u2605'} max={999} /*color="primary."*/>
                <Avatar 
                  alt={authorname && authorname.toUpperCase()} 
                  src={`http://localhost:8080/public/images/avatars/${authorAvatarUrl}`}                
                />
              </StyledBadge>
              <Typography variant="h6" className={classes.title}>
                {postTitle}
              </Typography>
              <Typography variant="subtitle1" className={classes.author}>
                {`By ${authorname}`}
              </Typography>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          
          <Paper elevation={3} className={classes.content}>
            <Typography >{postDate}</Typography>
            <Divider className={classes.divider}/>

            {fetchFullPostData.data 
              ? <Typography>{fetchFullPostData.data.post.body}</Typography>
              : <><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton width='50%' /></>
            }
            <Divider className={classes.divider}/>
            
            <div className={classes.actions}>
              
              <Button className={classes.actionBtn}
                variant='text'
                color='primary'
                startIcon={<RateReviewOutlinedIcon  color='primary'/>} 
              >
                Comment
              </Button>
              
              <Button className={classes.actionBtn}
                variant='text'
                color='primary'
                startIcon={<BookmarkBorderOutlinedIcon color='primary'/>} 
              >
                Follow
              </Button>

              <Button className={classes.actionBtn}
                variant='text'
                color='primary'
                startIcon={<FavoriteBorderIcon color='primary'/>} 
              >
                Like
              </Button>
            </div>
          </Paper>

          
          {fetchFullPostData.data && fetchFullPostData.data.post.comments.length > 0 && 
            <Paper elevation={2} className={classes.comments}>
              <div style={{display: 'flex', alignItems: 'center'}}>
              <ForumOutlinedIcon style={{marginRight: 5}}/>
              <Typography variant='h6'>Comments</Typography>
              </div>
              <Divider />
              
              <List>
                  {fetchFullPostData.data && fetchFullPostData.data.post.comments.map(comment => {
                    return <><ListItem>
                            
                            <ListItemText 
                              primary={<div style={{width: '80%'}}>{comment.text}</div>} 
                              secondary={'By '+comment.author.username}
                              
                            />
                            
                            <ListItemSecondaryAction>
                              <Button className={classes.actionBtn}
                                variant='outlined'
                                color='primary'
                                startIcon={<ThumbUpOutlinedIcon color='primary'/>} 
                              >
                                {25}
                              </Button>
                              <Button className={classes.actionBtn}
                                variant='outlined'
                                color='secondary'
                                startIcon={<ThumbDownAltOutlinedIcon color='secondary'/>} 
                              >
                                {5}
                              </Button>
                            </ListItemSecondaryAction>
                          </ListItem>
                          <Divider /></>
                  })}
              </List>

            </Paper>
          }

        </Container>
    );

}

const Comments = props => {
  
}

export default SingleFullPostDialog;