#!/usr/bin/env bash


# ############################### DEPRECATED ###################################
# this is a deprecated script used to start the API server via venv python 
# basically run: python3 -m venv <name of dir to create within pythons venv>
# afterwards use pip to install all needed packages, 
# to run, source the created "activate" script.
#
# source:
# https://opensource.com/article/19/4/managing-python-packages
# in my case 'be_tes1' was the name of the venv, and it worked great,
# afterwords I've fixed broken pipenv and it's even lighter to use than venv..
# ############################### DEPRECATED ###################################


MY_PATH="`dirname \"$BASH_SOURCE\"`"    # relative
MY_PATH="`( cd \"$MY_PATH\" && pwd )`"  # absolutized and normalized

echo "Staring BE using python default venv..."
echo "BE absolute path: $MY_PATH"

source $MY_PATH/be_test1/bin/activate && python $MY_PATH/app.py 

echo 'Stopping BE server venv...'
deactivate

deactivate_RC=$?
if [ $deactivate_RC -eq 0 ]; then
    echo "exitted from pythons venv succesfully"
else
    echo "Was not able to deactivate venv"
    echo "deactivate return code was: ${deactivate_RC}"
fi

