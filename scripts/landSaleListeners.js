require("dotenv").config();
let Web3 = require("web3");

const { LAND_SALE } = require("../constants");
let LandSaleAbi = require("../ABIs/LandSaleContract.json");

let web3 = new Web3(`https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`);

const landSaleInstance = new web3.eth.Contract(
  LandSaleAbi,
  LAND_SALE.CONTRACT_ADDRESS
);

async function transferEvents() {
  let events = await landSaleInstance.getPastEvents("Transfer", {
    fromBlock: LAND_SALE.START_BLOCK,
    toBlock: "latest",
  });

  console.log(events);
  console.log(events.length, "Transfer events");
}

async function approvalEvents() {
  let events = await landSaleInstance.getPastEvents("RoleGranted", {
    fromBlock: LAND_SALE.START_BLOCK,
    toBlock: "latest",
  });

  console.log(events);
  console.log(events.length, "RoleGranted events");
}

async function ownershipTransferredEvents() {
  let events = await landSaleInstance.getPastEvents("OwnershipTransferred", {
    fromBlock: LAND_SALE.START_BLOCK,
    toBlock: "latest",
  });

  console.log(events);
  console.log(events.length, "OwnershipTransferred events");
}

module.exports = {
  transferEvents,
  approvalEvents,
  ownershipTransferredEvents,
};
