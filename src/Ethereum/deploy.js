//deploy.js
// const HDWalletProvider = require("@truffle-hdwallet-provider");
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const fs = require("fs");
require("dotenv").config();
const bytecode = fs.readFileSync(
  "../../artifacts/src_Ethereum_contracts_myNft_sol_TNFT.bin",
  {
    encoding: "utf8",
  }
);
const abi = JSON.parse(
  fs.readFileSync("../../artifacts/src_Ethereum_contracts_myNft_sol_TNFT.abi", {
    encoding: "utf8",
  })
);
const provider = new HDWalletProvider(
  "second actor venue wreck easily prison brain anger prison card bicycle model",
  "https://rinkeby.infura.io/v3/b93d91e7f1d442f28e9d8536b47e0b44"
  // "https://coston-api.flare.network/ext/bc/C/rpc"
);
// https://docs.flare.network/en/networks/coston-testnet
// const web3 = new Web3(new Web3.providers.HttpProvider('https://coston-api.flare.network/ext/bc/C/rpc'));

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("-=", accounts);
  console.log("Attempting to deploy from account", accounts[0]);
  const result = await new web3.eth.Contract(abi)
    .deploy({
      data: "0x" + bytecode,
      arguments: [0, 4],
    })
    .send({ gas: "5000000", from: accounts[0] });
  console.log("Contract deployed to", result.options.address);
};
try {
  deploy();
} catch (e) {
  console.log(e);
} finally {
  console.log("entering and leaving the finally block");
}
