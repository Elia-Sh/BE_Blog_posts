# BE_Blog_posts
Small Backend project,
to practice APIs with flask, python and even pythons virtual envs - venv and pipenv.
On the way, fork the old blog posts FE,
based on Stephen Udemy course,
to a modern version of `react*` packages,
+ mongoDB docker

## Usage:
1. clone
2. validate pre-requisites -> currently:
* docker,
* pipenv,
* npm
3. start mongo DB using the script: `mongoDB_docker_deploy/mongodb_docker_deploy.sh`
4. start the BE with: `python_flask_api_server/start_api_server.sh`
5. start the FE with: `react_app_updated_blog/start_fe.sh`

Note,
* FE uses webpack and port 3000
* BE flask and port 5000
* Docker runs mongoDB 4.0 and tunnels to default port: 27017

