const data = require('json-loader!./dist/transactions_data.json');
const _ = require('ramda'),
      generateChart = require('./chart');
const compose = _.compose,
      curry = _.curry,
      sum = _.sum,
      map = _.map,
      groupBy = _.groupBy,
      mean = _.mean,
      applySpec = _.applySpec,
      values = _.values,
      prop = _.prop,
      length = _.length;

// [Transaction] -> {String:[Transaction]}
const groupTransactionsBy = groupBy;

// [Transaction] -> Number
const totalOf = of => compose( sum, map(prop(of)));
const avgOf = of => compose(mean, map(prop(of)));

// build filter data
const transactionListStats = applySpec(
{
  ['total shares']: totalOf('shares'),
  ['total value']: totalOf('value')
}
)

const createBreakdownBy = curry((by, transform) => compose( map(transform), groupTransactionsBy(prop(by))));

const ccyBreakdown = createBreakdownBy('ccy');
const ricBreakdown = createBreakdownBy('ric');

const createChartForBreakdown = (container, breakdown) => compose( generateChart(container), breakdown(transactionListStats) );

createChartForBreakdown('#chart1', ccyBreakdown)(data);
createChartForBreakdown('#chart2', ricBreakdown)(data);

//
// console.log( ccyBreakdown(length)(data));
// console.log( ccyBreakdown(avgOf('shares'))(data));
//
// console.log( ricBreakdown(length)(data));
// console.log( ricBreakdown(avgOf('shares'))(data));
//
// console.log( traderBreakdown(length)(data));
// console.log( traderBreakdown(avgOf('shares'))(data));


