require("dotenv").config();
let Web3 = require("web3");

const { MANAGER_CONTRACT } = require("../constants");
let ManagerAbi = require("../ABIs/LandManagerContract.json");

let web3 = new Web3(`https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`);

const landSaleInstance = new web3.eth.Contract(
  ManagerAbi,
  MANAGER_CONTRACT.CONTRACT_ADDRESS
);

async function landSoldEvent() {
    let events = await landSaleInstance.getPastEvents("LandSold", {
      fromBlock: MANAGER_CONTRACT.START_BLOCK,
      toBlock: "latest",
    });
    return events;
  }


module.exports =  {
  landSoldEvent
}