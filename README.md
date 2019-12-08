# Eventum: An Event Platform App

This hybrid app was created during and for the 2019 ESE course. It consists of a frontend which is an Ionic application and a backend which is a Node.js application written in Typescript which uses the express.js framework:
- The main project folder contains two subfolders: frontend and backend. These two are projects on their own which you will run independently. 
 - The backend folder contains an express project that serves as a REST API, exposes endpoints to accept HTTP requests. For received HTTP requests, it in turn returns JSON data.
 - The frontend folder contains an Ionic project, which makes HTTP requests to the backend and processes the JSON data received i.e. make changes if required and display it on the UI.
 - Projects are separated in this way because in the future one can easily replace either of them if the team decides to use another technology e.g. React JS for frontend or Django REST framework for backend

## Technologies
- [Ionic](https://ionicframework.com/) 5.4.2
- Express.js 4.17.1
- Docker v x.x
- [Node.js](https://nodejs.org/en/)
- NPM
- [Angular CLI](https://cli.angular.io/)
- Database: 
  - [PostgreSQL](https://www.postgresql.org/download/) 12.1
- IDE:
  - [Webstorm](https://www.jetbrains.com/webstorm/)

## Installation Guide

### Prerequisites
- [Node.js](https://nodejs.org/en/) and NPM should be installed (NPM is installed automatically with latest versions of Node.js) which are needed by both **frontend** and **backend** projects. You can verify whether you have both by running `node -v` and `npm -v` in terminal or command prompt.
- [Angular CLI](https://cli.angular.io/) should be globally installed:
  - `npm install -g @angular/cli`
- [Ionic](https://ionicframework.com/) should be globally installed: 
   - `npm install -g ionic`
- Docker and `docker-compose` should be installed. Please notice that you will have to use Linux or Mac to run the Docker stack. You cannot run the stack on Windows. The reason is that the the database will be stored on the Filesystem of the Docker host and the database container is not able to address Windows-style paths correctly (it uses Unix-style paths, `/` instead of `\`).

### Getting started
- Clone this repo on your machine.
- Navigate (in your terminal) into the cloned folder and type `docker-compose -f docker-compose-all.yml up --build`. This will download all the Docker images needed, start the containers and build our application.
- You're done! Open your browser and go to [localhost:8100](http://localhost:8100).
You can do all of this in one line in your terminal. If you are using Linux make sure your current user is a member of the the `docker` group (which has some [security implications](https://docs.docker.com/engine/security/security/)) or run the command as root. Once you have Docker and docker-compose set up, just run 
```bash
git clone https://github.com/scg-unibe-ch/ese2019-team10.git && cd ese2019-team10 && docker-compose -f docker-compose-all.yml up --build
```

