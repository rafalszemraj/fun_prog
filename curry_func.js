const curry = require('ramda').curry;
const log = console.log.bind(console);

const spaces = /\s+/g;
const vowels = /[aeiouy]/ig;

var match = (what, where) => where.match(what) !== null;

console.log( match(spaces, "hello world")); // true
console.log( match(vowels, "fck")); // false

// hasVowels, hasSpaces ???

match = what => where => where.match(what) !== null;

var hasVowels = match(vowels);
console.log( hasVowels("hello world")); // true
console.log( hasVowels("fck")); // true

// better way

const matchCurried = curry( (what, where) => where.match(what) !== null);

// both are the same
matchCurried(vowels, "hello");
matchCurried(vowels)("hello");

var hasVowels = matchCurried(vowels);

