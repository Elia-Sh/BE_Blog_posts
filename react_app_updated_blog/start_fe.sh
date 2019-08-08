#!/usr/bin/env bash

# trap ctrl-c and call ctrl_c()
trap ctrl_c INT

function ctrl_c() {
        echo "** Trapped CTRL-C"
        echo "INFO: exiting per user request.."
}


MY_PATH="`dirname \"$BASH_SOURCE\"`"    # relative
MY_PATH="`(cd \"$MY_PATH\" && pwd )`"  # absolutized and normalized
COMMAND_INSTALL=(npm install)
COMMAND_RUN=(npm start)


echo "FE absolute path: ${MY_PATH}"

#cd to scripts dir to create pythons venv locally
cd "${MY_PATH}"

# install idependencies using npm
"${COMMAND_INSTALL[@]}"
# run the api server using python+flask
cd "${MY_PATH}"
echo "current path is: `pwd`"
echo "will run: ${COMMAND_RUN[@]}"
"${COMMAND_RUN[@]}"
deactivate_RC=$?

echo "Stopped FE development server," 
echo "'${COMMAND_RUN[@]}' return code: ${deactivate_RC}"

if [ $deactivate_RC -eq 0 ]; then
    echo "Exitted succesfully"
else
    echo "Something Whent Wrong.."
fi

