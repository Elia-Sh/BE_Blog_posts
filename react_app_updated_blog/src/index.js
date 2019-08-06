// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();


import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import { Switch, Route, Router } from 'react-router-dom';
import { createBrowserHistory } from "history";

import App from './components/app';
import PostNew from './components/post_new';


import routes from './routes';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const customHistory = createBrowserHistory();

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    {/* <Router history={customHistory} routes={routes} /> */}
    <Router history={customHistory}>
        <div>
            <Switch >
                <Route exact path="/" component={App} />
                <Route path="/posts/new" component={PostNew} /> 
            </Switch>
        </div>
    </Router>
  </Provider>
  , document.querySelector('.container'));


