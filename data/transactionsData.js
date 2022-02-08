const fetch = require("node-fetch");
const url = "http://quiet-stone-2094.herokuapp.com/transactions.json";

async function getTransactions() {
  return await fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      throw err;
    });
}

async function getTransactionBySku(sku) {
  try {
    const response = await fetch(
      "http://quiet-stone-2094.herokuapp.com/transactions.json"
    );
    console.log("SKU PARAMETRO", sku)
    const data = await response.json();
       
    return data.filter(s => s.sku = sku);  
  } 
  catch (error) {
    console.log("Error", error);
  }  
}

module.exports = { getTransactions, getTransactionBySku };
