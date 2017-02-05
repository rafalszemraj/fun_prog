const _ = require('lodash');
const R = require('ramda');

const nodes = [{childNodes: [1,2]},{childNodes: [3, 4]}];

const getChildren = node => node.childNodes;

// lodash style
// map(collection, iteratee) -> mappedCollection

var allTheChildren = elements => _.map(elements, getChildren);

// ramda style
// map(iteratee, collection) -> mappedCollection
// 1. data comes last
// 2. all ramda functions are curried by default

// so this one...
allTheChildren = elements => R.map(getChildren, elements);
//... is same as this
allTheChildren = elements => R.map(getChildren)(elements);
// .. so can be declared like this
allTheChildren = R.map(getChildren); // no data, pure algorithm!!
