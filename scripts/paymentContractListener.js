require("dotenv").config();
let Web3 = require("web3");

const { PAYMENT_CONTRACT } = require("../constants");
let PaymentContract = require("../ABIs/PaymentContract.json");

let web3 = new Web3(`https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`);

const paymentContractInstance = new web3.eth.Contract(
  PaymentContract,
  PAYMENT_CONTRACT.CONTRACT_ADDRESS
);

async function ethPaymentEvents() {
  let events = await paymentContractInstance.getPastEvents("ethPayment", {
    fromBlock: PAYMENT_CONTRACT.START_BLOCK,
    toBlock: "latest",
  });
  return events;
}

async function tokenPaymentEvents() {
  let events = await paymentContractInstance.getPastEvents("tokenPayment", {
    fromBlock: PAYMENT_CONTRACT.START_BLOCK,
    toBlock: "latest",
  });
  return events;
}

async function userWhitelistedEvents() {
  let events = await paymentContractInstance.getPastEvents("userWhiteListed", {
    fromBlock: PAYMENT_CONTRACT.START_BLOCK,
    toBlock: "latest",
  });
  return events;
}

module.exports = {
  ethPaymentEvents,
  tokenPaymentEvents,
  userWhitelistedEvents,
};
