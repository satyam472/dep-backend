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
// goerli contract address : 0xac1E955633Ba045A065BE038050484042627C7EE
// 0x167F3D7d19ab58DA03cAd4Da2849d78F8EC660a6

const myAddress = "0xA404C8849C20997EE4ba3A4709976d7Aa3286398";

// initialize web3 provider
dotenv.config();
const privatekey = process.env.PRIVATE_KEY;
console.log(privatekey);
const filecoinRpcUrl = "https://api.hyperspace.node.glif.io/rpc/v1";
// const infura_api_key = process.env.INFURA_API_KEY;

// const infura_rpc_url = "https://goerli.infura.io/v3/" + infura_api_key;
var provider = new Provider(privatekey, filecoinRpcUrl);
var web3 = new Web3(provider);
// const web3 = new Web3("https://api.hyperspace.node.glif.io/rpc/v1"); 

// instantiate contract object
const smartContractAddress =  "0x167F3D7d19ab58DA03cAd4Da2849d78F8EC660a6"; // your smart contract address;
const myContract = new web3.eth.Contract(smartContractABI, smartContractAddress);

const getVideoAccessByToken = async(_address, _tokenId) => {
    const isAccess = await myContract.methods.optCheckAccess(_address, _tokenId).call();
    console.log(isAccess);
    return isAccess;
}

const getCourseNftToken = async(_courseName, _tutorName, _coursePrice) => {
    var courseToken;
    try {
        const result = await myContract.methods.createCourseNFT(_courseName, _tutorName, _coursePrice).send({ from: myAddress });
        console.log(result);
        courseToken = result.events.Transfer.returnValues.tokenId;
        console.log("course tokenId from createCourseNFT: ", courseToken);
    } catch (error) {
        console.error("error in createCourseNFT: ", error);
    }
    return courseToken;
}

const getVideoNftToken = async(_courseName, _tutorName) => {
    var courseToken;
    try {
        const result = await myContract.methods.createCourseNFT(_courseName, _tutorName).send({ from: myAddress });
        console.log(result);
        courseToken = result.events.Transfer.returnValues.tokenId;
        console.log("course tokenId from createCourseNFT: ", courseToken);
    } catch (error) {
        console.error("error in createCourseNFT: ", error);
    }
    return courseToken;
}

const checkOwnership = async(_tokenId) => {
    try{
        const owner = await myContract.methods.getNftOwner(_tokenId).call();
        console.log("owner of tokenId: ", _tokenId, " is ", owner);
        return owner;
    } catch(err){
        console.error("error in getNftOwner function : ", err);
        return Promise.reject(err);
    }
}

const checkIfPurchasedCourse = async(_courseToken, _moduleName, _videoName, _videoImageUrl, _videoUrl, _videoPrice) => {
    try{
        const isPurchased = await myContract.methods.optCheckAccess(_courseToken, _moduleName, _videoName, _videoImageUrl, _videoUrl, _videoPrice).call();
        console.log("result of optCheckAccess: ", _tokenId, " is purchased:", isPurchased, " by the ", _address);
        return owner;
    } catch(err){
        console.error("error in optCheckAccess function : ", err);
        return Promise.reject(err);
    }
}

const purchaseVideo = async(_address, _token) => {
    try{
        // const isPurchased = await myContract.methods.buyCourseVideoFor(_address, _token).call();
        await myContract.methods.buyCourseVideoFor(_address, _token).send({ from: _address, value: web3.utils.toWei(videoPrice[_tokenId].toString(), 'ether') });
        // console.log("result of buyCourseVideoFor: ", _tokenId, " is purchased:", isPurchased, " by the ", _address);
        return true;
    } catch(err){
        console.error("error in optCheckAccess function : ", err);
        return Promise.reject(err);
    }
}

const purchaseCourse = async(_address, _token) => {
    try{
        // const isPurchased = await myContract.methods.buyCourseVideoFor(_address, _token).call();
        await myContract.methods.buyCourseFor(_address, _token).send({ from: _address, value: web3.utils.toWei(coursePrice[_tokenId].toString(), 'ether') });
        // console.log("result of buyCourseVideoFor: ", _tokenId, " is purchased:", isPurchased, " by the ", _address);
        return true;
    } catch(err){
        console.error("error in optCheckAccess function : ", err);
        return Promise.reject(err);
    }
}

module.exports = { 
    myContract,
    checkIfPurchasedCourse,
    getCourseNftToken,
    getVideoNftToken,
    checkOwnership,
    purchaseVideo,
    purchaseCourse
};
