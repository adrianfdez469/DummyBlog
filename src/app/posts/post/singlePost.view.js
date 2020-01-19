import React, {useState} from 'react';
import {
    makeStyles,
    Avatar,    
    Typography,
    Card,
    CardHeader,
    IconButton,
    CardActions,
    CardContent,
    Badge,
    withStyles,    
    Button,
    Link
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import Skeleton from '@material-ui/lab/Skeleton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


import useLoved from './useLoved';
import { useMessage } from '../../message/messageAPI';


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    height: 284,
    marginTop: '1rem',
    justify:"center"
  },
  summary: {
    height: 100,
    overflow: 'hidden',
    marginBottom: '2rem'
  },
  cardHeader: {
    height: 40,
    overflow: 'hidden'
  },
  /*media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },*/
  expand: {
    //transform: 'rotate(0deg)',
    marginLeft: 'auto',
    marginRight: '1rem'
    //transition: theme.transitions.create('transform', {
      //duration: theme.transitions.duration.shortest,
    //}),
  },
  /*expandOpen: {
    transform: 'rotate(180deg)',
  },*/
  avatar: {
    backgroundColor: red[500],
  },
  actions: {
    marginLeft: 10,
    //cursor: 'pointer'
  }
}));

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

const PostUserActions = props => {

  const { postId, userAuthId, handleLikes, classes} = props;

  const [isLoved, handleLove] = useLoved(postId, userAuthId, handleLikes);

  return <IconButton aria-label="add to favorites" size='small' className={classes.actions} onClick={handleLove}>
          { isLoved ? <FavoriteIcon color="secondary"/>
                    : <FavoriteBorderIcon color="primary"/>}
        </IconButton>;
  }

const PostView = props => {

    const classes = useStyles();
    
    const [MessgeCmp, setMessageText] = useMessage();

    const {
      authorname,
      authorAvatarUrl,
      authorPoints,
      
      postTitle,
      postDate,
      postSummary,
      likes,
      authState,
      postId,
      handleOpenFullPost
    } = props;
    
    const [numberLikes, setNumberLikes] = useState(likes);

    const actions = authState.username  ? <PostUserActions 
                                              classes={classes}
                                              postId={postId} 
                                              userAuthId={authState.userId}
                                              handleLikes={setNumberLikes}
                                          />
                                        : <IconButton 
                                            aria-label="add to favorites" 
                                            size='small' 
                                            className={classes.actions} 
                                            onClick={() => setMessageText("Need to be authenticated", 'info')}
                                          >
                                            <FavoriteBorderIcon color='primary'/>
                                          </IconButton>

    const post =
      <>
        {MessgeCmp}
        <Card className={classes.card}>
          <CardHeader className={classes.cardHeader}
            avatar={
              <StyledBadge badgeContent={authorPoints+'\u2605'} max={999} /*color="primary."*/>
                <Avatar 
                  aria-label="recipe" 
                  className={classes.avatar} 
                  alt={authorname.toUpperCase()} 
                  src={`http://localhost:8080/public/images/avatars/${authorAvatarUrl}`}                
                />
              </StyledBadge>
            }
            title={postTitle}
            subheader={<div>By {authorname} on {postDate}</div>}
          />
          <CardContent className={classes.summary} style={{height: '5rem'}}>
            <Typography variant="body2" color="textSecondary" component="p">
              {postSummary}
            </Typography>
          </CardContent>

          <CardActions disableSpacing>
            {actions}
            <Typography variant='subtitle1' color="textSecondary">{numberLikes}</Typography>
            <Button 
              className={classes.expand} 
              variant="outlined" 
              color='primary' 
              size='small'
              onClick={handleOpenFullPost.bind(this, postId, 
                authorname,
                authorAvatarUrl,
                authorPoints,
                postTitle,
                postDate,
                postSummary,
                numberLikes,
                authState
              )} 
            >
              More
            </Button>
          </CardActions>          
        </Card>
        </>
      ;

      return post;

}

export default PostView;



const SinglePostSkeleto = props => {

  const classes = useStyles();

  return (
      <Card className={classes.card}>
          <CardHeader
          avatar={
              <Skeleton variant="circle" width={40} height={40} />
          }
          title={<Skeleton height={10} width="80%" style={{ marginBottom: 6, overflow: 'scroll' }} />}
          subheader={<Skeleton height={10} width="40%" />}
          />

          <CardContent>
              <Skeleton height={10} style={{ marginBottom: 6 }} />
              <Skeleton height={10} style={{ marginBottom: 6 }} />
              <Skeleton height={10} style={{ marginBottom: 6 }} />
              <Skeleton height={10} style={{ marginBottom: 6 }} />
              <Skeleton height={10} style={{ marginBottom: 6 }} />
              <Skeleton height={10} style={{ marginBottom: 6 }} />
              <Skeleton height={10} style={{ marginBottom: 6 }} />
              <Skeleton height={10} width="80%" />
          </CardContent>
      </Card>
  );
}
export {SinglePostSkeleto}

