const curry = require('ramda').curry;
const log = console.log.bind(console);

const spaces = /\s+/g;

var match = (what, where) => where.match(what) !== null;

match(spaces, "hello world"); // true

// let's curry it!!

const matchCurried = curry( (what, where) => where.match(what) !== null);

// both are the same
matchCurried(spaces, "hello"); // still works old way!
matchCurried(spaces)("hello"); // work as curried as well!

const hasSpaces = matchCurried(spaces);
hasSpaces("helloWorld"); // false

