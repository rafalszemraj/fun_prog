const fs = require('fs');
const _ = require('ramda');
const chance = new (require('chance'));

const cache = {};

const fromCache = (key, newValueFactory) => cache[key] ? cache[key] : cache[key] = newValueFactory();

const getRic = () => chance.pickone(['APPLE.OQ', 'VOD.L', 'WMT.N', 'IBM.N']);
const getCcy  = () => chance.pickone(['USD', 'EUR', 'GBP', 'PLN', 'AUS', 'JPN', 'HKG']);
const getShares = () => chance.natural({ min: 300, max: 500 });
const calculateCCyFX = ccy => fromCache(ccy, () => ccy === 'USD' ? 1 : chance.floating({min:.5, max:1.5}) );
const calculateValue = ric => fromCache(ric, () => chance.natural({min: 300, max: 500}) );
const getTrader = () => chance.pickone(['Mike', 'Steven', 'John', 'Bill']);


chance.mixin({
  "transaction": () => {

    const ccy = getCcy();
    const ric = getRic();
    return {
      ccy,
      ric,
      value:calculateValue(ric),
      shares:getShares(),
      /*trader:getTrader(),*/
      /*fx: calculateCCyFX(ccy)*/}
  }
})



try {
  fs.mkdirSync(__dirname + "/dist");
}
catch(e) {}
fs.writeFileSync(__dirname + "/dist/transactions_data.json", JSON.stringify(_.times(chance.transaction, 100)));

