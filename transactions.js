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
const totalOf = of => compose(sum, map(prop(of)));
const avgOf = of => compose(mean, map(prop(of)));

// build filter data
const transactionListStats = transactions => (
{
    ['total shares']: totalOf('shares')(transactions),
    ['total value']: totalOf('value')(transactions)
}
);

// [Transaction] -> {by:[transform(Transaction)}
const createBreakdownBy = curry((transform, by) => compose(map(transform), groupTransactionsBy(prop(by))));

//const createChartBreakdown = by => createBreakdownBy(transactionListStats, by);

generateChart(createBreakdownBy(transactionListStats, 'ccy')(data));
generateChart(createBreakdownBy(transactionListStats, 'ric')(data));


// console.log( ccyBreakDown(length)(data));
// console.log( ccyBreakDown(avgOf('shares'))(data));
// console.log( ccyBreakDown(avgOf('value'))(data));
//
// console.log( ricBreakdown(length)(data));
// console.log( ricBreakdown(avgOf('shares'))(data));
//
// console.log( traderBreakdown(length)(data));
// console.log( traderBreakdown(avgOf('shares'))(data));


