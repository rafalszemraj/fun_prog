const data = require('json-loader!./dist/transactions_data.json');
const _ = require('ramda');

const compose = _.compose,
      sum = _.sum,
      map = _.map,
      groupBy = _.groupBy;
const log = console.log.bind(console);

const generateChart = require('./chart');

const ccy = transaction => transaction.ccy;
const ric = transaction => transaction.ric;
const shares = transaction => transaction.shares;
const value = transaction => transaction.value;

const valueInUSD = transaction => transaction.value * transaction.fx;
const shareValue = transaction => transaction.value / transaction.shares;


console.log( _.map(_.map(shareValue), _.groupBy(ccy, data)));


// [Transaction] -> {String:[Transaction]}
const groupTransactionsBy = property => groupBy(property);

// [Transaction] -> Number
const calculateTotalOf = of => compose( sum, map(of) );


const totalSharesByRic = _.compose(
    _.map(calculateTotalOf(shares)),
    groupTransactionsBy(ric)
)

const totalValueByCCY = _.compose(
  _.map(calculateTotalOf(value)),
  groupTransactionsBy(ccy)
)

const avg = of => _.compose( _.mean, _.map(of));

// build filter data

const buildChartData = _.applySpec(
{
  ['total shares']: calculateTotalOf(shares),
  ['total value']: calculateTotalOf(value),
  ['total value in USD']: calculateTotalOf(valueInUSD),
  ['avg value']: avg(valueInUSD),
  ['avg share value']: avg(shareValue)
}
)


const ccyBreakdown = compose( map(buildChartData), groupTransactionsBy(ccy));
const ricBreakdown = compose( map(buildChartData), groupTransactionsBy(ric));


generateChart(ccyBreakdown(data));
generateChart(ricBreakdown(data), '#chart2');

console.log(ccyBreakdown(data));



