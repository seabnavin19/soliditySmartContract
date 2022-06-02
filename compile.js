const path = require("path");
const fs = require("fs");
const solc = require("solc");

const counterPath = path.resolve(__dirname, "contracts", "remote-purchase.sol");
const source = fs.readFileSync(counterPath, "utf8");

module.exports = solc.compile(source, 1).contracts[":purchaseAgreement"];
console.log(solc.compile(source, 1));
