// const path = require("path");
// const fs = require("fs");
// const solc = require("solc");
// const auctionPath = path.resolve(__dirname, "contracts", "myNft.sol");
// const source = fs.readFileSync(auctionPath, "utf8");
// console.log(solc.compile(source));

const path = require("path");
const fs = require("fs");
const solc = require("solc");
// Compile contract
const contractPath = path.resolve(__dirname, "contracts", "myNft.sol");
const source = fs.readFileSync(contractPath, "utf8");
const input = {
  language: "Solidity",
  sources: {
    "myNft.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};
const tempFile = JSON.parse(solc.compile(JSON.stringify(input)));
// const contractFile = tempFile.contracts["myNft.sol"]["myNft"];
console.log("tempFile", tempFile);
module.exports = tempFile;
