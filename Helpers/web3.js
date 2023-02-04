var Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const dotenv = require("dotenv");
const smartContractABI = require("./contractAbi");

// older contract address : 0xD2344f3054D363Aa2715ba83B29F58aCcfeb9186f
// new contract address : 0x86a79622c1B9F4B23ea029db139C9e800990d5e8
// newest contract address : 0x5d82EF0D93816bd054281F8B65A9Bf024b7a6564
// ekdum latest : 0x8f76099ddfBE52FaF0210a5d21c5313B440c4aFd
// usse bhi latest : 0xa2e397AE3B88357bC46DC338ca41956DDd630649
// : 0xDBea783c04781B497f29818f28A86312d6A04088
// 0x64f6DEd1571f2b8Ed1dC51Ed804Ef3B0DcEc0821

const myAddress = "0xA404C8849C20997EE4ba3A4709976d7Aa3286398";

// initialize web3 provider
dotenv.config();
const privatekey = process.env.PRIVATE_KEY;
console.log(privatekey);
const filecoinRpcUrl = "https://api.hyperspace.node.glif.io/rpc/v1";
var provider = new Provider(privatekey, filecoinRpcUrl);
var web3 = new Web3(provider);
// const web3 = new Web3("https://api.hyperspace.node.glif.io/rpc/v1"); 

// instantiate contract object
const smartContractAddress =  "0x64f6DEd1571f2b8Ed1dC51Ed804Ef3B0DcEc0821"; // your smart contract address;
const myContract = new web3.eth.Contract(smartContractABI, smartContractAddress);

const getVideoAccessByToken = async(_address, _tokenId) => {
    const isAccess = await myContract.methods.optCheckAccess(_address, _tokenId).call();
    console.log(isAccess);
    return isAccess;
}

const getCourseNftToken = async(_courseName, _tutorName) => {
    var courseToken;
    try {
        const result = await myContract.methods.createCourseNFT(_courseName, _tutorName).send({ from: myAddress });
        courseToken = result.events.Transfer.returnValues.tokenId;
        console.log("course tokenId from createCourseNFT: ", courseToken);
    } catch (error) {
        console.error("error in createCourseNFT: ", error);
    }
    return courseToken;
}

module.exports = { 
    myContract,
    getVideoAccessByToken,
    getCourseNftToken
};
