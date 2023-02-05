// const CourseModel = require("../Models/courseModel");
const { checkOwnership, checkIfPurchasedCourse } = require("../Helpers/web3");

const checkOwnershipQuery = async(body)=>{
    // try{
    //     // const response = await CourseModel.find({course_name:body.course_name});
    //     // return Promise.resolve({ status: true,response:response})
    //     const owner = await checkOwnership(body.tokenId);
    //     if (body.address == owner) {
    //         return Promise.resolve({ status: true, data:"true"});
    //     }
    //     else{
    //         return Promise.resolve({ status: true, data:"false"});
    //     }
    // }
    // catch(err){
    //     return Promise.reject([500, 'Something failed in checkOwnership function'])
    // }
    try{
        const owner = await checkOwnership(body.tokenId);
        return (body.address == owner) ? 
        Promise.resolve({ status: true, data: "true" }) : 
        Promise.resolve({ status: true, data: "false" });
    } catch (err) {
        return Promise.reject(err);
    }
}

const getUserRoleQuery = async(body)=>{
    try{
        // const response = await CourseModel.find({course_name:body.course_name});
        // return Promise.resolve({ status: true,response:response})
        var response;
        const owner = await checkOwnership(body.tokenId);
        if (body.address == owner) {
            response = 1;
        } else if (await checkIfPurchasedCourse(body.address, body.tokenId)) {
            response = 2;
        } else {
            response = 3;
        }
        return Promise.resolve({ status: true,response:response});
    }
    catch(err){
        return Promise.reject([500, 'Internal Server Error'])
    }
}

module.exports = {
    checkOwnershipQuery,
    getUserRoleQuery
}