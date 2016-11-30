const _ = require('ramda');
const log = console.log.bind(console);

const spaces = /\s+/g;
const vowels = /[aeiouy]/ig;

var match = function(what, where) {
    return where.match(what) !== null
}

console.log("match(spaceRegExp, 'hello world') => ", match(spaces, "hello world")); // true

// curry (example one)
match = function(what) {
    return function(where) {
        return where.match(what) !== null;
    }
}

// partially applied match...
const hasSpaces = match(spaces); // hasSpaces is Function
console.log("hasSpaces('nospaces') => ", hasSpaces("nospaces")); // false
console.log("hasSpaces('hello wordl') => ", hasSpaces("hello wordl")); // true


const hasVowels = match(vowels);
console.log('hasVowels("dog") => ', hasVowels("dog")); // true
console.log('hasVowels("fck") => ', hasVowels("fck")); // false

// curry (better example, using ramda/lodash curry)
match  = _.curry((what,where) => where.match(what, where) !== null);

console.log('match("hello")("hello world") => ', match("hello")("hello world")); // true
console.log('match("hello", "hello world") => ', match("hello", "hello world")); // true

const isWelcome = match("hello");

console.log("isWelcome('hello world') =>", isWelcome("hello world")); // true
