var compose = function(f,g) {
  return function(x) {
    return f(g(x))
  }
}

// _.compose, R.compose => compose(f,g,h,i,j...)

const toUpperCase = x => x.toUpperCase();
const exclaim = x => x+'!';


const shout = compose(exclaim, toUpperCase);

shout("it's a trap"); // IT'S A TRAP!

const shoutLoud = compose(exclaim, shout);

shoutLoud("it's a trap"); // IT'S A TRAP !!
