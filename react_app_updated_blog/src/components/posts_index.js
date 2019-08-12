import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions/index';
import { ActionType } from 'redux-promise-middleware';




class PostsIndex extends Component {
    componentWillMount() {
        // componentWillMount is a React lifecycle method, 
        //  https://www.udemy.com/react-redux/learn/v4/t/lecture/4419866
        //  when a method named: componentWillMount is defined, 
        //  react will call this method automatically -
        //  when the component is about to be rendered into the DOM for the first time
        //      it will not be called on subsequent renders
        //  meaning this method is called "once" and here is the best place to "fetch the data from the server"
        console.log("durning componentWillMount");
        this.props.fetchPosts();
        console.log("this.props.posts is: ", this.props.posts);

    }


    renderPosts() {
        console.log("within renderPosts ", this.props.posts);
        if (this.props.posts.result === ActionType.Fulfilled) {
            this.props.posts.all.sort(function(a, b){
                return a.creationDate>b.creationDate ? -1 : 
                        a.creationDate<b.creationDate ? 1 : 0;
            })
            if (this.props.posts.all.length > 0) {
                return this.props.posts.all.map((post) => {
                    var timeStampObj = new Date(Date.parse(post.creationDate))
                        return (
                        <li className="list-group-item container list-group-item-action " key={post.id} >
                            <div className="row d-flex justify-content-between">
                                <div className="col">
                                    <strong>{post.title}</strong>
                                </div>
                                <div className="col">
                                    {post.categories}
                                </div>
                                <div className="col badge badge-info text-monospace">
                                    { timeStampObj.toLocaleString() }
                                </div>
                            </div>
                        </li>
                    );
                });
            } else {
                return (<li className="list-group-item">No post Found,
                 please add couple of your own..</li>)
            }
        }
        else if (this.props.posts.result === ActionType.Pending){
            return (<div>Loading posts </div>)
        }
        else if (this.props.posts.result === ActionType.Rejected){
            return (<div>Error Loading posts :( </div>)
        }
    }


    render() {
        return (
            <div className="d-flex flex-column justify-content-between mt-3">
                <div className="d-flex flex-row-reverse">
                    <div className="col d-flex justify-content-end pr-md-1">
                        <div>
                            <Link to='/posts/new' className="btn btn-primary">
                                Add a Post
                            </Link>
                        </div>
                    </div>
                    <div className="col pl-md-1">
                        <h3>Posts</h3>
                    </div>
                </div> 
                <div className="">
                    <ul className="d-flex flex-column" >
                        {this.renderPosts()}
                    </ul>
                </div>
            </div>
        );
    }
}

// NOTE! we are replacing mapDispatchToProps with: {fetchPosts: fetchPosts} within the connect method,
//  this will still provide access to this.props.fetchPosts() within the component,
//  but without "implementing" mapDispatchToProps method..
//  and we can "condence" it even more with es6 "trick" - same key, same "value" becomes: { fetchPosts }
//
// function mapDispatchToProps(dispatch) {
//     // mapDispatchToProps provides access to: this.props.fetchPosts() within the component
//     return bindActionCreators({ fetchPosts }, dispatch);
// }

function mapStateToProps(state) {
    console.log("in mapStateToProps, state is: ", state );
    return { posts: state.posts }
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);