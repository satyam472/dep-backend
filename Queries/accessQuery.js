// const CourseModel = require("../Models/courseModel");
const { getVideoAccessByToken } = require("../Helpers/web3");

const getVideoByTokenQuery = async(body)=>{
    try{
        // const response = await CourseModel.find({course_name:body.course_name});
        // return Promise.resolve({ status: true,response:response})
        const access = await getVideoAccessByToken(body.address, body.tokenId);
        return Promise.resolve({ status: true,response:response})
    }
    catch(err){
        return Promise.reject([500, 'Internal Server Error'])
    }
}

const getPurchasedCoursesQuery = async(body)=>{
    try{
        // const response = await CourseModel.find({course_name:body.course_name});
        // return Promise.resolve({ status: true,response:response})
        const access = await getVideoAccessByToken(body.address, body.tokenId);
        return Promise.resolve({ status: true,response:response})
    }
    catch(err){
        return Promise.reject([500, 'Internal Server Error'])
    }
}

module.exports = {
    getVideoByTokenQuery,
    getPurchasedCoursesQuery
}