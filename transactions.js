const data = require('json-loader!./dist/transactions_data.json');
const _ = require('ramda');

const compose = _.compose,
      sum = _.sum,
      map = _.map,
      groupBy = _.groupBy,
      mean = _.mean,
      applySpec = _.applySpec,
      values = _.values;

const generateChart = require('./chart');

const ccy = transaction => transaction.ccy;
const ric = transaction => transaction.ric;

const shares = transaction => transaction.shares;
const value = transaction => transaction.value;


// [Transaction] -> {String:[Transaction]}
const groupTransactionsBy = _.groupBy;

// [Transaction] -> Number
const calculateTotalOf = of => compose( sum, map(of) );

// {String:[Transactions] -> {String:Number}
const calculateTotalsOf = of => map(calculateTotalOf(of))


// build filter data

const buildChartData = applySpec(
{
  ['total shares']: calculateTotalOf(shares),
  ['total value']: calculateTotalOf(value)
}
)

const createBreakdownBy = by => compose( map(buildChartData), groupTransactionsBy(by));

const ccyBreakdown = createBreakdownBy(ccy);
const ricBreakdown = createBreakdownBy(ric);


generateChart(ccyBreakdown(data), "#chart1");
generateChart(ricBreakdown(data), '#chart2');


//console.log( calculateTotalOf(shares)(data));
//console.log( compose( calculateTotalsOf(shares), groupTransactionsBy(ccy))(data) );
//console.log( compose( calculateTotalsOf(shares), groupTransactionsBy(ric))(data) );
//console.log( compose( calculateTotalsOf(value), groupTransactionsBy(ccy))(data) );
//console.log( compose( calculateTotalsOf(value), groupTransactionsBy(ric))(data) );


// const transBy = by =>  groupTransactionsBy(by);
// const transShareCost = by => compose( map( map(costByShare) ), transBy(by) );
// const meanTransShareCost = by => compose( map( mean), transShareCost(by) );


