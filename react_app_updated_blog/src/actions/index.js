import axios from 'axios';
import { resolve } from 'q';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';

// const ROOT_URL = 'https://reduxblog.herokuapp.com/api';
// const API_KEY = '?key=YzM3OTI1MmZiZGY0'; // just a unique key generated with: date +%s | shasum | base64 | head -c 16; echo

// Working on local DB and backend
const ROOT_URL = 'http://127.0.0.1:5000';
const API_KEY = '?key=None'; // just a unique key generated with: date +%s | shasum | base64 | head -c 16; echo


export function fetchPosts() {
    // `` is string interpolation = es6 Template literals
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

    return {
        type: FETCH_POSTS,
        payload: request    // the request is a promise, handled by redux-promise middleware, no need to handle promise myself
    };
}

export function createPost(props){
    // props are the "fields" - title, categories, content,
    // no need to "upack" props 
    // since props contain only the fields "names" and values as expected by API server
    // const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, props);
    
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, props);
    
    return {
        type: CREATE_POST,
        payload: request
    }
    
}

// import { createAsyncAction } from 'redux-promise-middleware-actions';

