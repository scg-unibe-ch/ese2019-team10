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
- Docker should be installed.

### Getting started
- Clone this repo on your machine and immediately delete `.git` folder.
- [frontend](https://github.com/JoelNiklaus/ESE-2019-Scaffolding/tree/master/frontend) and [backend](https://github.com/JoelNiklaus/ESE-2019-Scaffolding/tree/master/backend) contain instructions to set up the projects on your machines.

