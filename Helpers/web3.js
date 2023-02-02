var Web3 = require('web3');
// const Provider = require('@truffle/hdwallet-provider');

// older contract address : 0xD2344f3054D363Aa2715ba83B29F58aCcfeb9186f
// new contract address : 0x86a79622c1B9F4B23ea029db139C9e800990d5e8
// newest contract address : 0x5d82EF0D93816bd054281F8B65A9Bf024b7a6564
// ekdum latest : 0x8f76099ddfBE52FaF0210a5d21c5313B440c4aFd
// usse bhi latest : 0xa2e397AE3B88357bC46DC338ca41956DDd630649
var smartContractAddress =  "0xa2e397AE3B88357bC46DC338ca41956DDd630649"; // your smart contract address;
var smartContractABI = require("./contractAbi");
// var address = process.env.ACCOUNT_ADDRESS;
// var privatekey = process.env.PRIVATE_KEY;
// var rpcurl = process.env.RPC_URL;

// var provider = new Provider(privatekey, rpcurl);
// var web3 = new Web3(provider);

const web3 = new Web3("https://api.hyperspace.node.glif.io/rpc/v1");

var myContract = new web3.eth.Contract(smartContractABI, smartContractAddress);

// const { Filecoin } = require('filecoin-provider')
// const filecoin = new Filecoin(process.env.RPC_URL)
// const contractAddress = '0xD2344f3054D363Aa2715ba83B29F58aCcfeb9186f';

// Create an instance of your smart contract
// const contract = filecoin.lotus.contracts.at(contractAddress);

module.exports = myContract;
