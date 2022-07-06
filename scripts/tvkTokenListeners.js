require("dotenv").config();
let Web3 = require("web3");

const { TVK_TOKEN } = require("../constants");
let TvkTokenAbi = require("../ABIs/TvkTokenContract.json");

let web3 = new Web3(`https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`);

const tvkTokenInstance = new web3.eth.Contract(
  TvkTokenAbi,
  TVK_TOKEN.CONTRACT_ADDRESS
);

async function transferEvents() {
  let events = await tvkTokenInstance.getPastEvents("Transfer", {
    fromBlock: TVK_TOKEN.START_BLOCK,
    toBlock: "latest",
  });

  console.log(events);
  console.log(events.length, "Transfer events");
}

async function approvalEvents() {
  let events = await tvkTokenInstance.getPastEvents("Approval", {
    fromBlock: TVK_TOKEN.START_BLOCK,
    toBlock: "latest",
  });

  console.log(events);
  console.log(events.length, "Approval events");
}

module.exports = {
  transferEvents,
  approvalEvents,
};
