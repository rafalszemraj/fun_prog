const fs = require('fs');
const _ = require('ramda');
const chance = new (require('chance'));

const fxs = {};

const calculateCCyFX = ccy => ccy === 'USD' ? 1 : (fxs[ccy] ? fxs[ccy] : fxs[ccy] = chance.floating({min:.5, max:1.5}) );

chance.mixin({
  "transaction": () => (
    {
      ccy: chance.pickone(['USD', 'EUR', 'GBP', 'PLN', 'AUS', 'JPN', 'HKG']),
      ric: chance.pickone(['APPLE.OQ', 'VOD.L', 'WMT.N', 'IBM.N']),
      value: chance.natural({ min: 200, max: 9000 }),
      shares: chance.natural({ min: 300, max: 500 })
    }
  ),
  "transaction_fx": () => {

    const ccy = chance.pickone(['USD', 'EUR', 'GBP', 'PLN', 'AUS', 'JPN', 'HKG']);
    const fx = calculateCCyFX(ccy)
    return {
      ccy,
      ric: chance.pickone(['APPLE.OQ', 'VOD.L', 'WMT.N', 'IBM.N']),
      value: chance.natural({ min: 200, max: 9000 }),
      shares: chance.natural({ min: 300, max: 500 }),
      fx
    }

  }

})

const transaction = chance.transaction,
      transaction_fx = chance.transaction_fx;

try {
  fs.mkdirSync(__dirname + "/dist");
}
catch(e) {}
fs.writeFileSync(__dirname + "/dist/transactions_data.json", JSON.stringify(_.times(transaction_fx, 100)));
