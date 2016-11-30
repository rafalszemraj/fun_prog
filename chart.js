const c3 = require('c3');

var chart = c3.generate({
    data: {
        x: 'x',
        columns: [
            ['x', 'USD', 'GBP', 'EUR', 'PLN', 'JPN', 'AUS'],
            ['value', 30, 200, 100, 400, 150, 250],
            ['shares', 130, 300, 200, 300, 250, 450],
            ['med', 40, 50, 60, 70, 70, 80]
        ],
        type: 'bar',
        labels: true,
        axes: {
            value: 'y',
            shares: 'y2'
        }

    },
    axis: {
        x: {
            type:'category'
        },
        y:{
            label: "value"
        },
        y2:{
            show: true,
            label: "shares"
        }
    }
});
