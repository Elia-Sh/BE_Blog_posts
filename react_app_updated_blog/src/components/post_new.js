import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { ActionType } from 'redux-promise-middleware';

import { createPost } from '../actions/index';

class PostNew extends Component {
    constructor(props){
        super(props)
        this.state = {
            isSubmitting: false
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        // debugger
        const values = {}
        var refs_obj = this.refs
        Object.keys(refs_obj).forEach(function(key) {
            values[key] = refs_obj[key].value
        });
        this.props.createPost(values)
    }

    componentDidUpdate(prevProps, prevState) {
        // debugger
        if(this.props.createPostsRequest.result === ActionType.Fulfilled) {
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <h3>Create A New Post</h3>
                <div>
                    { (this.props.createPostsRequest.result === ActionType.Pending) &&
                        <h2>
                            Posting to the cloud, please pend..
                        </h2>
                        // conditional formatting for notifying the user if submit in progress
                        // note to self, as I can see below, 
                        // no need to add 'submitting to the state',
                        // this.props.<ajax via axios + redux promise >.result,
                        // can be accessed from every where.
                    }
                    { (this.props.createPostsRequest.result === ActionType.Rejected) &&
                        <h2>
                            Big error adding new post :(
                        </h2>
                    }
                </div>
                <div className={ 'has-danger TODO Fix danger based on new API of redux form' }>
                    <label>Title</label>
                    <div>
                        <input type="text" name='title' ref="title" className="form-control"/>
                    </div>
                    <div className='text-help'>
                        { 'title error -> fix text-help based on new API..'}
                    </div>
                </div>
                <div className={ '' }>
                    <label>Categories</label>
                    <div>
                        <input type="text" name='categories' ref="categories" className="form-control"/>
                    </div>
                    <div className='text-help'>
                        { '' }
                    </div>
                </div>
                <div className={ '' }>
                    <label>Content</label>
                    <div>
                        <textarea type="text" name='content' ref="content" className="form-control"/>
                    </div>
                    <div className='text-help'>
                        { '' }
                    </div>
                </div>

                <button type='submit' className='btn btn-primary' >Submit</button>
                <Link to='/' className='btn btn-danger'>Cancel</Link>
            </form>
        );
    }
}

// TODO fix the validators after migrating off reduxForm.
// the validate function is called by reduxForm,
// we need to pass it's name within the reduxForm configuration
function validate(values) {
    // values are the values from the form.
    const errors = {};
    // if returned object - errors object in this case,
    // has a key that matches to one of field names passed within the reduxForm configuration
    // the reduxForm will fail the validation and prevent from "submit" to proceed
    if (!values.title) {
        // field named: title, was submitted with no value.
        errors.title = 'Enter a title'
    }
    if (!values.categories) {
        // field named: title, was submitted with no value.
        errors.categories = 'Enter categories'
    }
    if (!values.content) {
        // field named: title, was submitted with no value.
        errors.content = 'Enter some content'
    }
    return errors;

}
function mapStateToProps(state, ownProps) {
    const { createPostsRequest } = state
    // debugger
    return { createPostsRequest }
}  

export default PostNew = connect(
    mapStateToProps,
    { createPost }
)(PostNew)
