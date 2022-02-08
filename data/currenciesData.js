const fetch = require("node-fetch");

let url = "http://quiet-stone-2094.herokuapp.com/rates.json";

async function getCurrencies() {
  //   const response = await fetch(
  //     "http://quiet-stone-2094.herokuapp.com/transactions.json"
  //   );
  //   const data = await response.json();
  //   return data;
  //   console.log(data);

  //   const transacciones = [];
  return await fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      throw err;
    });
}

module.exports = { getCurrencies };
