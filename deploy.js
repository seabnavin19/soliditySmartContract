// deploy code will go here
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "legend produce guide clump narrow neither warrior pave skin mention kite bamboo",
  "https://rinkeby.infura.io/v3/15c1d32581894b88a92d8d9e519e476c"
);
const web3 = new Web3(provider);
const deploy = async () => {
  const accounts = await web3.eth.getAccounts(); // return the list of all accounts with the specific mnemonic

  console.log("Attempting to deploy from account", accounts[0]);

  const contract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
    })
    .send({
      gas: "1000000",
      from: accounts[0],
    });

  console.log("Contract deployed to", contract.options.address);
};
deploy();
