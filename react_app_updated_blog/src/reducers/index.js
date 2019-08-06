import { combineReducers } from 'redux';

import PostsReducer from './reducer_posts';
import CreatePostReducer from './reducer_post_new';

const rootReducer = combineReducers({
  posts: PostsReducer, // PostsReducer is the reducer responsible for the !piece of application state! named: "posts"
                      //  meaning that any component, after implementing mapStateToProps redux method, can access the "posts" within application state
  createPostsRequest: CreatePostReducer,
});

export default rootReducer;
