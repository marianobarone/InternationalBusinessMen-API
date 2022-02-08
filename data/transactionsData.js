const fetch = require("node-fetch");

let url = "http://quiet-stone-2094.herokuapp.com/transactions.json";

async function getTransactions() {
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

async function getTransactionBySku(sku) {
  const response = await fetch(
    "http://quiet-stone-2094.herokuapp.com/transactions.json"
  );
  console.log("SKU PARAMETRO", sku)
  const data = await response.json();
     
  return data.filter(s => s.sku = sku);
}

module.exports = { getTransactions, getTransactionBySku };
