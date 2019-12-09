# Eventum: An Event Platform App

This hybrid app was created during and for the 2019 ESE course. It consists of a frontend which is an Ionic application and a backend which is a Node.js application written in Typescript which uses the express.js framework:
- The [main project folder](https://github.com/scg-unibe-ch/ese2019-team10/) contains two subfolders: frontend and backend. These two are projects on their own which you will run independently. 
 - The [backend](https://github.com/scg-unibe-ch/ese2019-team10/tree/master/backend) folder contains an express project that serves as a REST API, exposes endpoints to accept HTTP requests. For received HTTP requests, it in turn returns JSON data.
 - The [frontend](https://github.com/scg-unibe-ch/ese2019-team10/tree/master/frontend) folder contains an Ionic project, which makes HTTP requests to the backend and processes the JSON data received i.e. make changes if required and display it on the UI.
 - Projects are separated in this way because in the future one can easily replace either of them if the team decides to use another technology e.g. React JS for frontend or Django REST framework for backend

## Technologies
- [Ionic](https://ionicframework.com/)
- [Express.js](https://expressjs.com/)
- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [Angular CLI](https://cli.angular.io/)
- Database: 
  - [PostgreSQL](https://www.postgresql.org/download/) 12.1
- IDE:
  - [Webstorm](https://www.jetbrains.com/webstorm/)

## Installation Guide

### Prerequisites
- Docker and `docker-compose` should be installed. Please notice that you will have to use Linux or Mac to run the Docker stack. You cannot run the stack on Windows. The reason is that the the database will be stored on the Filesystem of the Docker host and the database container is not able to address Windows-style paths correctly (it uses Unix-style paths, `/` instead of `\`).

### Getting started
- Clone this repo on your machine.
- Navigate (in your terminal) into the cloned folder and type `docker-compose -f docker-compose-all.yml up --build`. This will download all the Docker images needed, start the containers and build our application.
- You're done! Open your browser and go to [localhost:8100](http://localhost:8100).
You can do all of this in one line in your terminal. If you are using Linux make sure your current user is a member of the the `docker` group (which has some [security implications](https://docs.docker.com/engine/security/security/)) or run the command as root. Once you have Docker and docker-compose set up, just run 
```bash
git clone https://github.com/scg-unibe-ch/ese2019-team10.git && cd ese2019-team10 && docker-compose -f docker-compose-all.yml up --build
```
- [Further information about docker and some troubleshooting](https://github.com/scg-unibe-ch/ese2019-team10/wiki/Technology)

### The architecture
The `docker-compose` command above sets up the following stack:
- A webserver serving the frontend (as mentioned above, you can find it under [localhost:8100](http://localhost:8100))
- A webserver serving the REST API (this will listen on `localhost:3000`)
- The database (only reachable from inside the docker network)
- pgadmin (listening on `localhost:8081`) with default credentials admin@mail.com:admin

## Usage
Once you have set up the app, you can register an account. Accounts have to be approved by an administrator before they can be uese. Because of this, **there is a default admin account with username 'admin@mail.com' and password 'xugai4nie9ief5AhshaiSh1aequaiy'** (you can set another password under 'Edit Profile' on the dashboard when logged in). New users can be approved under 'User Administration' on the admin dashboard.

## Further information
- [Backend readme](https://github.com/scg-unibe-ch/ese2019-team10/tree/master/backend/README.md)
- [Frontend readme](https://github.com/scg-unibe-ch/ese2019-team10/tree/master/frontend/README.md)
- [Wiki](https://github.com/scg-unibe-ch/ese2019-team10/wiki), especially the following articles:
  - [API](https://github.com/scg-unibe-ch/ese2019-team10/wiki/API)
  - [Technology](https://github.com/scg-unibe-ch/ese2019-team10/wiki/Technology)



