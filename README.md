# VizworX Code Exercise

This is my solution to the VizworX Code Exercise. It is developed with Node.js 9.2.0 using the --experimental-modules flag in order to enable import/export support.

## Rules

* Input:
  * Dietary requirements
    * Total meals
    * Vegetarian meals
    * Gluten free meals
  * Available restaurants
    * Rating
    * Total meals
    * Vegetarian meals
    * Gluten free meals
* Output
  * Selected restaurants
    * Vegetarian meals
    * Gluten free meals
    * Other meals
  * Average rating

For the given input, select the best possible meal orders with reasonable assumptions, aiming for highest average rating with fewest number of restaurants as a secondary goal.

## Setup

* Code for processing the logic of selecting meals from restaurants is in `app/server/`.
* Tests are in `test/integration/` and `test/unit/`, with unit tests being relative to their code in `app/server/`
* `app/server/index.js` contains a simple Express server with a POST API on `/computeOrder` for calling `OrderBruteForce` with a specific input

## Tooling

* Babel - Node 9.2 has basic support for ECMAScript Modules (`import/export` instead of `require`) but it is hidden behind the `--experimental-modules` flag. I chose Babel in order to write cleaner code while still supporting previous versions of Node.
  * `babel-plugin-transform-class-properties` - This is a Stage 2 proposal that is mostly stable. I chose to use this as it allows for cleaner class definitions
  * `babel-plugin-transform-object-rest-spread` - This is a Stage 3 proposal awaiting a finalized specification
* Chai/Mocha
* Nodemon
* ESLint with AirBnB configuration
* html-webpack-plugin - Easily generate HTML with webpack scripts automatically injected
* Immutable.JS
* Webpack
* react-hot-loader - Integrates with Webpack for easy hot-reloading of React components
* SASS

## Running

* `npm build` - Clean and build the complete system
* `npm build:browser` - Webpack the frontend code
* `npm build:server` - Babel the backend code
* `npm run lint` - Execute ESLint on `app/` and `test/`
* `npm run lint:watch` - Monitor changes to files and automatically run `npm run lint` when they change
* `npm run test` - Execute the Mocha/Chai Tests
* `npm run test:watch` - Monitor changes to files and automatically run `npm run test` when they change
* `npm run dev:browser` - Monitor changes to the files and automatically hot-reload the browser when they change. This launches a webpack-dev-server on [http://localhost:8080](http://localhost:8080), that can be used to view the web interface
* `npm run dev:server` - Monitor changes to files and automatically restart the server when they change. This launches an Express server for the API on [http://localhost:8081](http://localhost:8081)
* `npm start` - Build the complete system and run the server. You will be able to load the web interface via [http://localhost:8081](http://localhost:8081) at this point
