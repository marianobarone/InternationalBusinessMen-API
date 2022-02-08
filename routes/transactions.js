var express = require("express");
var router = express.Router();
var ratesData = require("../data/ratesData");
var transactionsData = require("../data/transactionsData");

const EURO_CURRENCY = "EUR";
var trans;
var rates;

router.get("/", async function (req, res, next) {
  try {
    if (trans == undefined) {
      trans = await transactionsData.getTransactions();
    }
    res.send(trans);
  } catch (error) {
    console.log("Erorr", error);
  }
});

router.get("/:sku", async function (req, res, next) {
  try {
    var transBySku;
    var total = 0;

    if (trans != undefined) {
      transBySku = trans.filter((t) => t.sku == req.params.sku);
    } 
    else transBySku = await transactionsData.getTransactionBySku(req.params.sku);

    if (rates == undefined) {
      rates = await ratesData.getRates();
    }

    transBySku.forEach((t) => {
      if (t.currency != EURO_CURRENCY) {
        t.amount = Number(Math.round(convertRate(t) * 10) / 10).toFixed(2);
        t.currency = EURO_CURRENCY;
      }
      total += Number(t.amount);
    });

    if ((total * 100) % 10 != 5) {
      total = (Math.round(total * 10) / 10).toFixed(2);
    }

    totalTransactions = {
      sku: req.params.sku,
      totalAmount: total,
      currency: EURO_CURRENCY,
    };

    transBySku.push(totalTransactions);
    res.send(transBySku);
  } 
  catch (error) {
    console.log("Error", error);
  }
});

function convertRate(tran) {
  try {
    var newAmount;

    if (rates.find((r) => r.from == tran.currency && r.to == EURO_CURRENCY)) {
      var oneStepConvertionRate = rates.filter((r) => r.from == tran.currency && r.to == EURO_CURRENCY);
      newAmount = Number(oneStepConvertionRate[0].rate * tran.amount);
    } 
    else {
      var euroRates = rates.find((r) => r.to == EURO_CURRENCY);
      var firstConvertionRate = rates.find((r) => r.from == tran.currency);

      newAmount = Number(rates.find((r) => r.from == tran.currency).rate) * Number(tran.amount);

      var twoStepsConvertionRate = rates.filter((r) => r.from == firstConvertionRate.to);

      var secondConvertionRate = twoStepsConvertionRate.find((y) => y.to == euroRates.from);

      if (secondConvertionRate != undefined) {
        newAmount = Number(secondConvertionRate.rate) * newAmount;
      }

      if (euroRates != undefined) {
        newAmount = Number(euroRates.rate) * newAmount;
      }
    }

    return newAmount;
  } 
  catch (error) {
    console.log("Error", error);
  }
}

module.exports = router;
