#!/usr/bin/env bash

# trap ctrl-c and call ctrl_c()
trap ctrl_c INT

function ctrl_c() {
        echo "** Trapped CTRL-C"
        echo "INFO: exiting per user request.."
}

export PIPENV_VENV_IN_PROJECT="enabled"

PY_EXEC_FILE_NAME="app.py"
MY_PATH="`dirname \"$BASH_SOURCE\"`"    # relative
MY_PATH="`(cd \"$MY_PATH\" && pwd )`"  # absolutized and normalized
COMMAND_INSTALL=(pipenv install)
COMMAND_RUN=(pipenv run python "${PY_EXEC_FILE_NAME}")


echo "Staring BE using python pipenv deploy shell script..."
echo "BE absolute path: ${MY_PATH}"
echo "PIPENV_VENV_IN_PROJECT is: ${PIPENV_VENV_IN_PROJECT}"

#cd to scripts dir to create pythons venv locally
cd "${MY_PATH}"

# install python virtual env with dependencies
"${COMMAND_INSTALL[@]}"
# run the api server using python+flask
cd "${MY_PATH}"
echo "current path is: `pwd`"
echo "will run: ${COMMAND_RUN[@]}"
"${COMMAND_RUN[@]}"
deactivate_RC=$?

echo "Stopped BE server pipenv," 
echo "'pipenv run' return code: ${deactivate_RC}"

if [ $deactivate_RC -eq 0 ]; then
    echo "Exitted succesfully"
else
    echo "Something Whent Wrong.."
fi

