from flask import Flask
from flask_cors import CORS

from flask import request
from flask_pymongo import PyMongo
from pymongo import errors as PyMongoErrors
from bson.json_util import dumps, loads
from datetime import datetime

# TODO working on:
#   https://www.bogotobogo.com/python/MongoDB_PyMongo/python_MongoDB_RESTAPI_with_Flask.php

# looking at the FE of the blog project,
# there are 3 properties title, categories, content

app = Flask(__name__, static_folder="static", template_folder="templates")
# from shell: export FLASK_ENV=development
# afterwards run: flask run
# TODO figure out why webpack/other complains about cors -
# Access to XMLHttpRequest at 'http://localhost:5000/posts?key=None'
# from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin'
# header is present on the requested resource. [http://localhost:3000/]
CORS(app, support_credentials=False)

# based on https://flask-cors.readthedocs.io/en/latest/#using-json-with-cors
app.config['CORS_HEADERS'] = 'Content-Type'
# for debug
# app.config['TESTING'] = True

app.config['MONGO_DBNAME'] = 'blogPostsDb'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/blogPostsDb'

mongo = PyMongo(app)


@app.route('/posts', methods=['GET', 'POST'])
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
    print('trying to add: {}'.format(data_json_dict))
    db_posts = mongo.db.posts

    # check if post does not exists in DB -

    # using try catch instead of: insert_result.acknowledged:
    # Using https://api.mongodb.com/python/current/api/pymongo/results.html#pymongo.results.InsertOneResult
    try:
        insert_result = db_posts.insert_one(data_json_dict)
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
        except:
            returned_issue = 'missing {}'.format(f)
    if len(data) > len(expected_fields):
        returned_issue = 'Error: Too many fields supplied as input'
    return returned_issue


if __name__ == "__main__":
    app.run()

