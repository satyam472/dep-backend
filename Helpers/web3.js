var Web3 = require('web3');

var smartContractAddress =  "0xa2e397AE3B88357bC46DC338ca41956DDd630649"; // your smart contract address;
var smartContractABI = require("./contractAbi");

const web3 = new Web3("https://api.hyperspace.node.glif.io/rpc/v1");

var myContract = new web3.eth.Contract(smartContractABI, smartContractAddress);

const getVideoAccessByToken = async(_address, _tokenId) => {
    const isAccess = await myContract.methods.optCheckAccess(_address, _tokenId).call();
    console.log(isAccess);
    return isAccess;
}

const getCourseNftToken = async(_address, _courseName, _tutorName) => {
    const courseToken = await myContract.methods.createCourseNFT(_courseName, _tutorName).send({ from: _address });
    console.log(courseToken);
    return courseToken;
}

module.exports = { 
    myContract,
    getVideoAccessByToken,
    getCourseNftToken
};
