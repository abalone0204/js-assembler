# HACK computer's Assembler

## Introduction

- This is the project 6 in the course: [nand2tetris](http://nand2tetris.org).

- It can translate the `HACK` machine language to binary code which can run on the `HACK` computer.

- As you see, this project is implemented with `node.js`.

- Maybe it's not perfect now, but I believe it will be.

## Usage

- `npm install`: to install the dependency

- `node assembler.js FILE_NAME` : And you will see the `FILE_NAME.hack` file in the same dir of the source file.

## Testing

- I've written all of the tests with the framework `mocha`. So if you want to make the testing script much better you should isntall mocha first which it's quite simple to do.

- Just type `sudo npm install -g mocha`

- `npm test` : To run all of the test

- All the tesing scripts are in the `test_suite.js`
