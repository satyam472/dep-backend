var Web3 = require('web3');

// older contract address : 0xD2344f3054D363Aa2715ba83B29F58aCcfeb9186f
// new contract address : 0x86a79622c1B9F4B23ea029db139C9e800990d5e8
// newest contract address : 0x5d82EF0D93816bd054281F8B65A9Bf024b7a6564
// ekdum latest : 0x8f76099ddfBE52FaF0210a5d21c5313B440c4aFd
// usse bhi latest : 0xa2e397AE3B88357bC46DC338ca41956DDd630649
// : 0xDBea783c04781B497f29818f28A86312d6A04088
// 0x64f6DEd1571f2b8Ed1dC51Ed804Ef3B0DcEc0821
var smartContractAddress =  "0x64f6DEd1571f2b8Ed1dC51Ed804Ef3B0DcEc0821"; // your smart contract address;
var smartContractABI = require("./contractAbi");

const web3 = new Web3("https://api.hyperspace.node.glif.io/rpc/v1");

const myContract = new web3.eth.Contract(smartContractABI, smartContractAddress);

const getVideoAccessByToken = async(_address, _tokenId) => {
    const isAccess = await myContract.methods.optCheckAccess(_address, _tokenId).call();
    console.log(isAccess);
    return isAccess;
}

const getCourseNftToken = async(_address, _courseName, _tutorName) => {
    console.log("inside getCourseNftToken function")
    console.log(_address, _courseName, _tutorName);
    const courseToken = await myContract.methods.createCourseNFT(_courseName, _tutorName).call({ from: _address }, (error, result) => {
        if (error) {
            console.error("error in getCourseNftToken : ", error);
        } else {
            console.log("result from callback function of createCourseNFT : ", result);
        }
    });
    console.log("course token is : ", courseToken);
    return courseToken;
}

module.exports = { 
    myContract,
    getVideoAccessByToken,
    getCourseNftToken
};
