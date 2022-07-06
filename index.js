require("dotenv").config();

const tvkEvents = require("./scripts/tvkTokenListeners");
const landSaleEvents = require("./scripts/landSaleListeners");
const paymentListeners = require("./scripts/paymentContractListener");
const managerListeners = require("./scripts/managerListeners");

async function main() {
  let ethPayment = await paymentListeners.ethPaymentEvents();
  let tokenPayment = await paymentListeners.tokenPaymentEvents();
  let soldEvents = await managerListeners.landSoldEvent();

  const accumulatedValues = await accumulateEvents(
    ethPayment,
    tokenPayment,
    soldEvents
  );

  console.log(accumulatedValues);
  console.log(accumulatedValues.length);
}

async function accumulateEvents(ethPayments, tvkPayments, solds) {
  let accumulatedValues = [];

  for (let i = 0; i < solds.length; i++) {
    for (let j = 0; j < tvkPayments.length; j++) {
      if (solds[i].returnValues.landId == tvkPayments[j].returnValues._landId) {
        tvkPayments[j].returnValues["_tokenId"] = solds[i].returnValues.tokenId;
        tvkPayments[j].returnValues["_paymentType"] = "TVK";
        tvkPayments[j].returnValues["transactionHash"] =
          tvkPayments[j].transactionHash;

        accumulatedValues.push(tvkPayments[j].returnValues);
      }
    }
    for (let j = 0; j < ethPayments.length; j++) {
      if (solds[i].returnValues.landId == ethPayments[j].returnValues._landId) {
        ethPayments[j].returnValues["_tokenId"] = solds[i].returnValues.tokenId;
        ethPayments[j].returnValues["_paymentType"] = "ETH";
        ethPayments[j].returnValues["transactionHash"] =
          ethPayments[j].transactionHash;
        accumulatedValues.push(ethPayments[j].returnValues);
      }
    }
  }
  return accumulatedValues;
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
