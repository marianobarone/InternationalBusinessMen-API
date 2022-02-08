var express = require("express");
var router = express.Router();

var transactionsData = require("../data/transactionsData");
var trans;

/* GET users listing. */
router.get("/", async function (req, res, next) {
  if (trans == undefined) {
    trans = await transactionsData.getTransactions();

    res.send(trans);
  } else {
    res.send(trans);
  }

  //   console.log("Result", trans);
  res.send(trans);
});

router.get("/sku/:sku", async function (req, res, next) {
  console.log("parametros", req.params.sku);
  const trans = await transactionsData.getTransactionBySku(req.params.sku);
  res.send(trans);
});

module.exports = router;
