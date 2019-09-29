# Back-End Scaffolding

## Initial Setup
1. Install [Node.js](https://nodejs.org/en/) (must be done already, as it is a part of prerequisite!)
1. `cd` into this backend folder with your shell (note: if you're on Windows, you can for example use [Git Bash](https://git-scm.com/download/win) as a shell)
1. run `npm install`
1. To compile the TypeScript code to JavaScript, run `npm run tsc`. After that, this folder should have a `build` folder containing a bunch of JavaScript files
1. Run `node build/server.js`. The command line output should say something like `Listening at http://localhost:3000/`
1. Test your installation by opening the following endpoints (i.e. "pages") in your browser:
    - [http://localhost:3000/welcome](http://localhost:3000/welcome)
    - [http://localhost:3000/welcome/BurtMacklin](http://localhost:3000/welcome/BurtMacklin) (or substitute any other name at the end)
    - Additionally the app contains an example for todolist and todoitem, CRUD (Create, Read, Update, Delete) operations can be performed on these two models. You can use frontend app to make these requests.

## Explanations
The inline comments in the .ts files of this scaffolding should help you understand most of what's going on. Here are a few additional explanations:
- While the application is just JavaScript code running in Node.js (see next point), the actual source code is written in TypeScript (.ts). TypeScript is essentially "JavaScript with types", and will be compiled to JavaScript to run in Node.js. Bottom line: only edit the .ts files, since all JavaScript files in this backend are compiler-generated and will be overwritten as soon as you recompile the application.
- Since this is the backend, the JavaScript code compiled from TypeScript will not be running in a web browser. Instead, we use [Node.js](https://nodejs.org) as our JavaScript runtime. You can think of Node.js as something similar to the Java Virtual Machine to run your compiled Java program, or a Python interpreter to run your Python code.
- Because we want to build a web server, we are using the [Express.js](http://expressjs.com/) JavaScript web framework to help us with handling requests and providing responses. If you study the import statements in this scaffolding, you can see Express.js how is being used here.
- This scaffolding only contains a couple of GET endpoints. However, when you develop a REST API, you will also need other HTTP request methods, such as POST, PUT, and DELETE. You can find more on that [here](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods). 
- In this scaffolding, the only endpoint that takes a parameter is `/welcome/:name`. Here, `name` is a _path parameter_, since it's part of the endpoint's path. However, you might also want to have a look at _query parameters_ and _request body parameters_.
- whenever you change something, make sure to recompile the TypeScript code (`npm run tsc`) and restart the express application (`node build/server.js`). Check out the last section of this README for tips on how to easily streamline this process.

## Adding a New Endpoint or Controller
To add a new endpoint that logically belongs to an existing controller, you simply have to add a new route to that controller's Router. See `welcome.controller.ts` for examples.

If you need to define a new controller, there are a few things you need to do:
1. create a new file `<mycontroller>.controller.ts` in the `controllers` folder. Check out our example controllers to see what to do within that file.
1. go to the `controllers/index.ts` file and export your new controller, as described in that `index.ts` file
1. in `server.ts`, mount the new controller analogous to the ones that are already in there (using `app.use(...)`)

## Streamline Your Development
So far, you need to recompile your TypeScript code and restart your express application after every change. This can get annoying really quickly, but can streamline this process by doing two things:
1. Instead of `npm run tsc`, use `npm run tsc -- --watch`. This will automatically recompile your TypeScript code to JavaScript every time a TypeScript file has changed on disk, as long as this command is running (i.e. until you abort it or close the shell). Don't forget to check that shell for compiler errors!
1. Install nodemon on your system (`npm install -g nodemon`), then run the express application using `nodemon build/server.js` (instead of `node build/server.js`). Similar to the `--watch` command above, this will restart your Node application (and thus, your server) every time a JavaScript file has changed on disk.

As long as you let these two processes run in two separate shells, your Node server should always be running and be up to date with your latest changes, every time you save one of your TypeScript files.
