#!/bin/sh

######################### INFO ###########################
#                                                        # 
# Shell script for Linux and MacOS hosts. It sets up the #
# docker network, builds the required images and runs    #
# the containers for our project (see listing below).    #
# The script requires exactly one commandline argument   #
# which specifies the path to the folder that shall      #
# contain the volume of the database container. If the   #
# folder does not exist, it will be created.             #
#                                                        #
# This script must be run as root on Linux. The ports    #
# will bind to 127.0.0.1 and will only be accessible     #
# locally.                                               #
#                                                        # 
# This script might be replaced with a docker-compose    #
# yaml file later on.                                    #
#                                                        # 
# phpmyadmin-dev  - localhost:8081                       #
# backend-dev - localhost:3000                           #
# database-dev - database-dev:3306 (docker network)      #
##########################################################

# check for first argument
if [ ! $1 ] ; then
    echo "Usage: $0 PATH_TO_VOLUME_DIRECTORY"
    exit
fi

VOLUME_PATH=$1

# try to create directory if it does not already exist
if [ ! -d $VOLUME_PATH ] ; then
    mkdir $VOLUME_PATH 2>/dev/null
    if [ $? ] ; then
        echo "Cannot create directory at ' $VOLUME_PATH'" 1>&2
        exit 1
    fi
fi

# create network for dev, ignor error if it does not already exist
docker network create dev-net

# build the backend and the database image specified by the Dockerfile
docker build --no-cache -t backend-dev ./

# stop and remove prevously built/run containers
docker stop backend-dev database-dev phpmyadmin-dev
docker container rm backend-dev database-dev phpmyadmin-dev

# start database, phpmyadmin and backend-dev containers
docker run -v $VOLUME_PATH:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=p4ssw0rd --name database-dev -h database-dev -d --network dev-net mariadb:10.4.3
docker run --name phpmyadmin-dev -h phpmyadmin-dev -d -p 127.0.0.1:8081:80 -e PMA_HOST=database-dev --network dev-net phpmyadmin/phpmyadmin
docker run --name backend-dev -h backend-dev -d -p 127.0.0.1:3000:3000 backend-dev
