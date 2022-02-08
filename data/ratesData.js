const fetch = require("node-fetch");
const url = "http://quiet-stone-2094.herokuapp.com/rates.json";

async function getRates() {
  return await fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      throw err;
    });
}

module.exports = { getRates };
