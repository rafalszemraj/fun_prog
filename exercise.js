

// data
var items = [1,2,3];


// impure
var inc = function(items) {
  for(var i = 0; i<items.length; i++) {
    items[i] = items[i]+1
  }
  return items
};

var double = function(items) {
  for(var i = 0; i<items.length; i++) {
    items[i] = items[i]*2;
  }
  return items
};


// test
function doSomeWork(items) {

  const incs = inc(items);
  const doubles = double(items);
  return {'incs':incs, 'doubles':doubles}

}

doSomeWork(items); // { incs: [???], doubles: [???] }

// data
var items = [1,2,3];

// pure
inc     = x => x + 1;
double  = x => x * 2;

function doSomeWorkBetterWay(items) {

  const incs = items.map(inc);
  const doubles = items.map(double);
  return {'incs':incs, 'doubles':doubles}

}

doSomeWorkBetterWay(items);  // { incs: [ ??? ], doubles: [ ??? ]}
