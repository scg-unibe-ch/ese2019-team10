#!/bin/sh

######################### INFO ###########################
# This script should work for Linux and MacOS hosts.     #
# It builds the backend image and runs a container of it #
# along with  a mariadb database (version 10.4.3) and a  #
# webserver running phpmyadmin. The database is not      #
# accessible from outside the docker network.            #
#                                                        # 
# phpmyadmin-dev  - localhost:8081                       #
# backend-dev - localhost:3000                           #
# database-dev - database-dev:3306 (docker network)      #
##########################################################

# create network for dev, ignor error if it does not already exist
docker network create dev-net

# build the backend and the database image specified by the Dockerfile
docker build --no-cache -t backend-dev ./

# stop and remove prevously built/run containers
docker stop backend-dev database-dev phpmyadmin-dev
docker container rm backend-dev database-dev phpmyadmin-dev

# start database, phpmyadmin and backend-dev containers
docker run -e MYSQL_ROOT_PASSWORD=p4ssw0rd --name database-dev -h database-dev -d --network dev-net mariadb:10.4.3
docker run --name phpmyadmin-dev -h phpmyadmin-dev -d -p 8081:80 -e PMA_HOST=database-dev --network dev-net phpmyadmin/phpmyadmin
docker run --name backend-dev -h backend-dev -d -p 8080:3000 backend-dev
