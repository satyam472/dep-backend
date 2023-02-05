const CourseModel = require("../Models/courseModel");
const UserModel = require("../Models/userModel");
const lighthouse = require('@lighthouse-web3/sdk');
const { getCourseNftToken } = require("../Helpers/web3")

const getAllCourseQuery = async(body) => {
    try{
        console.log(body);
        console.log(body.numOfCourses);
        const limit = body.numOfCourses;
        const response = await CourseModel.find({}, { course_token: 1, course_name: 1, course_image:1, tutor_name: 1, tutor_icon:1 }).limit(limit);
        console.log(response);
        return Promise.resolve({status:true, data:response});
    }
    catch(err){
        console.log(err);
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

const uploadToLighhouseQuery = async(image) => {
    try{
        const path = "C:/Users/Satyam/Desktop/data-dao-backend/VIDEOS/video-1.mp4"; 
        // const path = "../VIDEOS/video-1.mp4"; 
        const apiKey = process.env.API_KEY; 
        // console.log(req.body);
        const resp = await lighthouse.upload(image, apiKey);
        console.log(response);
        let courseImageurl = `https://ipfs.io/ipfs/${resp.response.data.Hash}`;
        // res.status(200).json(courseImageurl);
        return Promise.resolve({status:true,response:response});
    }
    catch(err){
        console.log(err);
        return Promise.reject([500, 'Internal Server Error'])
        // res.json(err);
    }
}

const addCourseQuery = async(body)=>{
    try{
        // const address = "0xA404C8849C20997EE4ba3A4709976d7Aa3286398";
        // console.log(address);
        console.log(body);
        var tokenId;
        try {
            tokenId = await getCourseNftToken(body.course_name, body.tutor_name);
            console.log("result from getCourseNftToken: ", tokenId);
        } catch (error) {
            console.error("error in getCourseNftToken: ", error);
        }
        console.log("tokenId from blockchain : ", tokenId);
        console.log(body.course_image);
        const courseImageResp = await uploadToLighhouseQuery(body.course_image);
        const tutorIconResp = await uploadToLighhouseQuery(body.tutor_icon);

        if(courseImageResp.status && tutorIconResp.status){
            let courseImageurl = `https://ipfs.io/ipfs/${courseImageResp.response.data.Hash}`;
            let tutorIconUrl = `https://ipfs.io/ipfs/${tutorIconResp.response.data.Hash}`;

            let doc = {
                course_token: tokenId,
                course_name: body.course_name, 
                course_imageUrl: courseImageurl,
                tutor_name: body.tutor_name, 
                tutor_icon: tutorIconUrl
            }

            await UserModel.updateOne({ wallet_address: body.address }, { $push: { authored_courses: { token_id: tokenId } } });
            console.log(doc)
            const response = await CourseModel.create(doc);
            console.log(response)
            return Promise.resolve({ status: true, response:response})
        }
        else{
            throw error;
        }
    }
    catch(err){
        return Promise.reject([500, 'Internal Server Error in addCourseQuery function'])
    }
}

module.exports = {
    uploadToLighhouseQuery,
    getAllCourseQuery,
    getCourseByNameQuery,
    getPurchasedCourseQuery,
    getAuthoredCourseQuery,
    addCourseQuery
}