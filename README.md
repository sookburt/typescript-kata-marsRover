# A Mars Rover Kata Interpretation in Typescript

## Intro:

Here is a command centre that will create a plateau on Mars and add a Rover to it.  You can then direct the movement of that Rover.

## To Install:

Pre-requisites: node (^16.13.2) and npm on your local machine.

Fork and clone the repo and run `npm install` on your local machine.

To run the tests, `npm test`

## To Run:

`npm start` will trigger nodemon to start (if you get an error, you may need to install ts-node globally as there is current an issue with that on Windows).

1. Create a Plateau by typing in the two dimensions in a comma separated string.
2. Create a Rover by giving it a name.
3. Create the starting co-ordinates by typing in two numbers and a direction such as N = North, E = East, S = South, W = West like: 1,2,N
4. Create the movement directions by typing in a string of letters containing L = Left, R = Right, M = Move like: RRMLLM
5. The rover should move and report it's current co-ordinates or give you the cause of the error.
