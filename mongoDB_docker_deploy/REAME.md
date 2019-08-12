# Why
One liner script to start a mongoDB docker instance, 

+ no need to install mongodb
+ no need to configure - uses the default configration from the docker image
+ no state - DB state is not stored, but initialized each time the docker instance starts
+ don't user in production - as said above, no state,
+ unsecure - default password and user,

just for development purposes, 
for production create proper [Dockerfile](https://docs.docker.com/engine/reference/builder/) for your mongo instances.

