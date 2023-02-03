const CourseModel = require("../Models/courseModel");
const UserModel = require("../Models/userModel");
const { getCourseNftToken } = require("../Helpers/web3")

const getAllCourseQuery = async() => {
    try{
        const response = await CourseModel.find({}, { course_token: 1, course_name: 1, course_image:1, tutor_name: 1, tutor_icon:1 });
        return Promise.resolve({status:true,response:response});
    }
    catch(err){
        return Promise.reject([500, 'Problem in getAllCourseQuery function'])
    }
}

const getPurchasedCourseQuery = async(body)=>{
    try{
        const response = await CourseModel.find({course_name:body.course_name});
        return Promise.resolve({ status: true,response:response})
    }
    catch(err){
        return Promise.reject([500, 'Internal Server Error'])
    }
}

const getAuthoredCourseQuery = async(body)=>{
    try{
        const response = await CourseModel.find({course_name:body.course_name});
        return Promise.resolve({ status: true,response:response})
    }
    catch(err){
        return Promise.reject([500, 'Internal Server Error'])
    }
}

const getCourseByNameQuery = async(body)=>{
    try{
        const response = await CourseModel.find({course_name:body.course_name});
        return Promise.resolve({ status: true,response:response})
    }
    catch(err){
        return Promise.reject([500, 'Internal Server Error'])
    }
}

const addCourseQuery = async(body)=>{
    try{
        const tokenId = await getCourseNftToken(body.owner_address, body.course_name, body.tutor_name);
        let doc = {
            course_token: tokenId,
            course_name: body.course_name, 
            image: body.image,
            tutor_name: body.tutor_name, 
            tutor_icon: body.tutor_icon
        }

        await UserModel.updateOne({ wallet_address: body.address }, { $push: { purchased_courses: { token_id: tokenId } } });
        console.log(doc)
        const response = await CourseModel.create(doc);
        console.log(response)
        return Promise.resolve({ status: true,response:response})
    }
    catch(err){
        return Promise.reject([500, 'Internal Server Error'])
    }
}

module.exports = {
    getAllCourseQuery,
    getCourseByNameQuery,
    getPurchasedCourseQuery,
    getAuthoredCourseQuery,
    addCourseQuery
}