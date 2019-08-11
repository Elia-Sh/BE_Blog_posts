from flask import Flask
from flask_cors import CORS, cross_origin

from flask import request
from flask_pymongo import PyMongo
from pymongo import errors as PyMongoErrors
from bson.json_util import dumps, loads
from datetime import datetime

# Roughly inspired by:
# https://www.bogotobogo.com/python/MongoDB_PyMongo/python_MongoDB_RESTAPI_with_Flask.php

# looking at the FE of the blog project,
# there are 3 properties title, categories, content for a post,

# next: /posts/<pstID>/ -> presents the post
# next: enable edit for posts,
# next: multiple uses -> twitter like "blog posts",
#           /<user name or id>/posts

app = Flask(__name__)
CORS(app)

app.config['MONGO_DBNAME'] = 'blogPostsDb'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/blogPostsDb'

mongo = PyMongo(app)

# initialize posts collection with couple of posts
@app.before_first_request
def init_demo_db():
    # dict of posts to insert into mongo
    demo_init_posts_list = [
        dict(title='First post!',
             categories='cat1 cat2',
             content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu vulputate ex. Phasellus aliquam '
                     'rutrum neque. Nullam vitae purus non nisl semper volutpat. Nam facilisis, dolor id sollicitudin '
                     'cursus, ipsum mi tempor purus, finibus aliquam tellus diam nec ipsum. Cras eget ex urna. Mquis '
                     'pretium augue. Donec mi augue, venenatis et malesuada eget, vulputate bibendum nunc. Curabitur '
                     'sollicitudin sapien sit amet velit iaculis tincidunt. Mauris suscipit tincidunt. Quisque '
                     'eget sapien fermentum, ornare nibh vel, convallis orci. Cras ac lectus egestas, sagittis sit '
                     'amet, ullamcorper nulla. ',
             creationDate='2019-08-10T12:11:15.903774'),
        dict(title='Another wonderful post',
             categories='cat1 cat',
             content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non facilisis tortor. Vestibulum '
                     'bibendum sodales lacus in imperdiet. Sed feugiat purus sem. Nullam non velit quam. Sed ut in '
                     'dui commodo tincidunt. Proin mollis quis quam nec dignissim. Proin purus justo, facilisis eget '
                     'libero ut, porttitor egestas nulla. Etiam varius auctor nulla at rhoncus. Duis tincidunt '
                     'condimentum lacus rutrum consequat.',
             creationDate='2019-08-10T12:13:44.774903'),
    ]
    existing_posts_list = list(mongo.db.posts.find({}))
    if len(existing_posts_list) > 0:
        # there are already posts in DB,
        # no need to add demo posts..
        return

    try:
        insert_result = mongo.db.posts.insert_many(demo_init_posts_list)
        print('INFO: successfully initialized demo posts DB')
    except PyMongoErrors.PyMongoError as e:
        # DB issue, don't return EXCEPTION to client,
        # there are cases where I want the application to know that the DB had a specific error,
        # and allow the front end/ logic what ever tp recover/ let the user know,
        # but in my simple "Blog backend API", I mask the DB error.
        print('Error: could not run demo setup, inster failed with:\n{}'.format(e))



@app.route('/posts', methods=['GET', 'POST'])
@cross_origin()
def process_posts_request():
    if request.method == 'GET':
        print('This is a GET request')
        return get_posts_from_db()
    else:
        # TODO should I do else if request.method == 'POST'
        #   this way I can "block" request types like put/update/etc
        print('This is a POST request')
        return add_post_to_db()


def add_post_to_db():
    # debug
    # print('request is: {}'.format(request))

    expected_fields = ['title', 'categories', 'content']
    data_json_dict = loads(request.data)
    issue_string = check_json(expected_fields, data_json_dict)
    if issue_string:
        return issue_string, 500

    data_json_dict['creationDate'] = datetime.now().isoformat()
    print('Adding new post:\n{}\n'.format(data_json_dict))
    db_posts = mongo.db.posts

    # check if post does not exists in DB -

    # using try catch instead of: insert_result.acknowledged:
    # Using https://api.mongodb.com/python/current/api/pymongo/results.html#pymongo.results.InsertOneResult
    try:
        insert_result = db_posts.insert_one(data_json_dict)
        print('Successfully added 1 record')
    except PyMongoErrors.PyMongoError as e:
        # DB issue, don't return EXCEPTION to client,
        # there are cases where I want the application to know that the DB had a specific error,
        # and allow the front end/ logic what ever tp recover/ let the user know,
        # but in my simple "Blog backend API", I mask the DB error.
        return 'some generic Internal Server Error, maybe saying stuff about DB', 500

    # got until here, with no exceptions check if returned_tuple == None
    return 'Submitted 1 record', 200


def get_posts_from_db():
    # get the posts from the db, and don't get the id field
    # no need to send the internal mongoDB _id to the FE,
    blog_posts_collection = mongo.db.posts.find({}, {'_id': 0})
    output = []
    tmp_post_id = 0

    # passing a 'dummy' ID field, this used in as key in <li> element.
    for post_dict in blog_posts_collection:
        post_dict['id'] = tmp_post_id
        tmp_post_id += 1
        output.append(post_dict)
    output.reverse()
    return dumps(output), 200


def check_json(expected_fields, data):
    returned_issue = None
    if not data:
        returned_issue = 'Error: no data'
    for f in expected_fields:
        try:
            data[f]
        except NameError:
            returned_issue = 'missing {}'.format(f)
    if len(data) > len(expected_fields):
        returned_issue = 'Error: Too many fields supplied as input'
    return returned_issue


if __name__ == "__main__":
    app.run()

