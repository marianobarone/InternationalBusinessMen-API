var express = require("express");
var router = express.Router();

var currenciesData = require("../data/currenciesData");
var currencies;

/* GET users listing. */
router.get("/", async function (req, res, next) {
//   console.log("PRIMERA VEZ CURRENCIES", currencies);
  if (currencies == undefined) {
    currencies = await currenciesData.getCurrencies();

    // console.log("Currencies", currencies);
    res.send(currencies);
  } else {
    // console.log("CURRENCIES CARGADAS", currencies);
    res.send(currencies);
  }
});

module.exports = router;
