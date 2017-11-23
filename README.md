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
* `app/server/index.js` contains a simple implementation for calling `OrderBruteForce` with a specific input, and can be executed with `npm start`

## Tooling

* Babel - Node 9.2 has basic support for ECMAScript Modules (`import/export` instead of `require`) but it is hidden behind the `--experimental-modules` flag. I chose Babel in order to write cleaner code while still supporting previous versions of Node.
  * `babel-plugin-transform-class-properties` - This is a Stage 2 proposal that is mostly stable. I chose to use this as it allows for cleaner class definitions
  * `babel-plugin-transform-object-rest-spread` - This is a Stage 3 proposal awaiting a finalized specification
* Chai/Mocha
* Nodemon
* ESLint with AirBnB configuration

## Running

* `npm run lint` - Execute ESLint on `app/` and `test/`
* `npm run lint:watch` - Monitor changes to files and automatically run `npm run lint` when they change
* `npm run test` - Execute the Mocha/Chai Tests
* `npm run test:watch` - Monitor changes to files and automatically run `npm run test` when they change
* `npm run dev:server` - Monitor changes to files and automatically restart the server when they change
* `npm start` - Run the server logic
