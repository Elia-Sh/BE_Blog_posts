import { FETCH_POSTS } from '../actions/index';
import { ActionType } from 'redux-promise-middleware';


// this is the "default" piece of state that the reducer responsible for
//  all -> reflects the list of all the blog posts
//  post -> reflects the indivial posts, the information that needed for showing a single post
// based on: https://www.udemy.com/react-redux/learn/v4/t/lecture/4419862?start=0
//TODO split the reducer to 2 reducers - 
//  one reducer for "all posts"
//  and one reducer for "current post" -> selected post to view

const FETCH_POSTS_PENDING = `FETCH_POSTS_${ActionType.Pending}`;
const FETCH_POSTS_FULFILLED = `FETCH_POSTS_${ActionType.Fulfilled}`;
const FETCH_POSTS_REJECTED = `FETCH_POSTS_${ActionType.Rejected}`;

const INITIAL_STATE = { result: null, all: [], post: null };

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_POSTS_FULFILLED:
            return { ...state, all: action.payload.data,
                result: ActionType.Fulfilled,
            };
        case FETCH_POSTS_PENDING:
            return { ...state, all: [],
                result: ActionType.Pending,
            };
            case FETCH_POSTS_REJECTED:
                return { ...state, all: [],
                    result: ActionType.Rejected,
            };
        default:
            return state;
    }
}