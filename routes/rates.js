var express = require("express");
var router = express.Router();

var ratesData = require("../data/ratesData");
var rates;

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    if (rates == undefined) {
      rates = await ratesData.getRates();
    }
    res.send(rates);
  } 
  catch (error) {
    console.log("Error", error);
  } 
});

module.exports = router;
