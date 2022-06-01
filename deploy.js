const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "rent federal fitness voyage saddle piece food scare found start fluid great", //   "banana apart patient zero start picnic stuff train arrow unable ancient file"
  "https://rinkeby.infura.io/v3/bf0dd4905756489aafac08814b69e9ae" //  "https://rinkeby.infura.io/v3/a00241eeb6c3428088f5792178805992"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi there!"] })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();