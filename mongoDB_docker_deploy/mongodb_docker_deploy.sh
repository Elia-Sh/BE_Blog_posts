#!/bin/bash


if which docker; then
    echo 'Starting docker MongoDB image...'
else
    echo 'Error: Docker not found; please install it'
    exit 1
fi
docker run -p 27017:27017 mongo:4.0