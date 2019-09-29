# Front-End Scaffolding

## Initial Setup
1. Install [Node.js](https://nodejs.org/en/) (must be done already, as it is a part of prerequisite!)
1. `cd` into this frontend folder with your terminal or command prompt
1. Run `npm install` which will install all the required dependencies
1. When successful, run `ionic serve` or `ionic serve --lab` to get a mobile platform view. This will open the application in your default web browser on `http://localhost:8100/`.
1. Alternatively, you can run just `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

This project uses [Ionic UI Components](https://ionicframework.com/docs/components) for styling.


## Further development 

- Run `ionic generate component component-name` to generate a new component. 
- Other commands can be found [here](https://ionicframework.com/docs/cli/commands/generate)

## A quick introduction to modules, components and services in Angular
[Architecture](https://angular.io/guide/architecture)

## Build

Run `ionic build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build. This `dist` folder is used to put on production server. More information [here](https://ionicframework.com/docs/cli/commands/build).

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
