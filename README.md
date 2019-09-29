# ESE 2019 Scaffolding
Welcome to the 2019 ESE course. You can use this scaffolding as a starting point for your group projects. It contains the following components:
- [frontend](https://github.com/JoelNiklaus/ESE-2019-Scaffolding/tree/master/frontend): an Ionic application
- [backend](https://github.com/JoelNiklaus/ESE-2019-Scaffolding/tree/master/backend): a Node.js application written in TypeScript, using the express.js web framework 

## Prerequisites
- You should have [Node.js](https://nodejs.org/en/) and NPM installed (NPM is installed automatically with latest versions of Node.js) which are needed by both [frontend](https://github.com/JoelNiklaus/ESE-2019-Scaffolding/tree/master/frontend) and [backend](https://github.com/JoelNiklaus/ESE-2019-Scaffolding/tree/master/backend) projects. You can verify whether you have both by running `node -v` and `npm -v` in terminal or command prompt.
- You should have [Angular CLI](https://cli.angular.io/) globally installed on your machine (`npm install -g @angular/cli`).
- You should have [Ionic](https://ionicframework.com/) globally installed on your machine (`npm install -g ionic`).
- Get your WebStorm student license [from here](https://www.jetbrains.com/shop/eform/students) 

## Getting started
- Clone this repo on your machine and immediately delete `.git` folder.
- We will create a GitHub repo for each team and add respective students to it. You will receive a link to this repo from us where you can push your changes.
- [frontend](https://github.com/JoelNiklaus/ESE-2019-Scaffolding/tree/master/frontend) and [backend](https://github.com/JoelNiklaus/ESE-2019-Scaffolding/tree/master/backend) contain instructions to set up the projects on your machines.
- We encourage you to use [WebStorm](https://www.jetbrains.com/webstorm/) as an IDE for this project. Once you clone the project to your machine, refer to [this](https://www.jetbrains.com/help/webstorm/angular.html) tutorial, specifically section 'Starting with an existing Angular application' to open and use the project in WebStorm. 

## Understanding project structure
- The main project folder contains two subfolders: frontend and backend. These two are projects on their own which you will run independently. 
- The backend folder contains an express project that serves as a REST API, exposes endpoints to accept HTTP requests. For received HTTP requests, it in turn returns JSON data.
- The frontend folder contains an Ionic project, which makes HTTP requests to the backend and processes the JSON data received i.e. make changes if required and display it on the UI.
- We have included an example that demonstrates how to create and delete todo list and corresponding todo items, it can be a good starting point to play around with models of your choice.
- Projects are separated in this way because in the future one can easily replace either of them if the team decides to use another technology e.g. React JS for frontend or Django REST framework for backend.
