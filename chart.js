const _ = require('ramda');
const c3 = require('c3');
const numeral = require('numeral');

var chartIndex = 1;
const dataFormatter = value => numeral(value).format( value % 1 ? '0.00' : '0,0')

module.exports = _.curry((chartData) => {

  const keys = _.keys(_.mergeAll(_.values(chartData)));
  const values = _.map(_.values, _.values(chartData));

  c3.generate(
    {
      bindto: '#chart'+(chartIndex++),
      size: {
        height: 700
      },
      data: {
        rows: _.concat([keys], values),
        type: 'bar',
        labels: {
          format:  dataFormatter
        }
      },
      axis: {
        x: {
          type: 'category',
          categories: _.keys(chartData)
        }
      },
      tooltip: {
        format: {
          value: dataFormatter
        }
      },
      bar: {
        width: {
          ratio: 0.8
        }
      }
    })
});
