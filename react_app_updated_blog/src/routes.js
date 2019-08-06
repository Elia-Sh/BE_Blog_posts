import React from 'react';
import { Route, Link, Switch } from "react-router-dom";


import App from './components/app';
import PostsIndex from './components/posts_index';
import PostNew from './components/post_new';

// routing map - "hey for this url show this component"
// IndexRoute -> will be shown whenever:
//      the url mathces the path defined by the parent but not his children
// in our example - whenever the url is: "/" ->
//      show the App component and PostIndex component

// react router appears as going to different pages,
// but actually swapping the content shown on the page

export default (
    // path="/" is the root of the webside
    // google.com/ => renders the "App" 
    <Switch>
        <Route path="/" component={App} />
        <Route path="/posts/new" component={PostNew} />
    </Switch>
    // <Route path="/" component={App} >
    //     <Route path="/" component={PostsIndex} />
    //     <Route path="/posts/new" component={PostNew} />
    // </Route>
);