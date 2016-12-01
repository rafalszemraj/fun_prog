const R = require('ramda'),
      compose = R.compose,
      reverse = R.reverse,
      words = ['brown', 'fox', 'jumps'];

const first = xs => xs[0];
const last = compose(first, reverse);
const exclaim = x => x+'!';
const toUpper = x => x.toUpperCase();

// compose is associative
// compose(f, compose(g, h)) == compose(compose(f, g), h);

var lastToUpperLoud = compose(exclaim, toUpper, last);
lastToUpperLoud(words); // JUMPS!

lastToUpperLoud = compose(exclaim, compose(toUpper, last));
lastToUpperLoud(words); // JUMPS!

lastToUpperLoud = compose(compose(exclaim, toUpper), last);
lastToUpperLoud(words); // JUMPS!

// any combination you like

const lastLetterFromFirst = compose(last, first);
const lastLetterFromLastToUpper = compose(toUpper, last, last);
const reverseFirst = compose( reverse, first);

lastLetterFromFirst(words); // n
lastLetterFromLastToUpper(words); // S
reverseFirst(words); // nworb

