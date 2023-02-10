const CourseModel = require("../Models/courseModel");
const UserModel = require("../Models/userModel");
const lighthouse = require('@lighthouse-web3/sdk');
const { getCourseNftToken, purchaseCourse } = require("../Helpers/web3")

const getAllCourseQuery = async(body) => {
    try{
        console.log(body);
        console.log(body.numOfCourses);
        const limit = body.numOfCourses;
        const response = await CourseModel.find({}, { course_token: 1, course_name: 1, course_image:1, tutor_name: 1, tutor_icon:1 }).limit(limit);
        console.log(response);
        return Promise.resolve({status:true, response:response});
    }
    catch(err){
        console.log(err);
        return Promise.reject([500, 'Problem in getAllCourseQuery function'])
    }
}

const getPurchasedCourseQuery = async(body)=>{
    try{
        // const response = await CourseModel.find({course_name:body.course_name});
        const user = await User.findOne({ wallet_address: body.address });
        if (!user) {
            return Promise.reject([404, 'User not found']);
        }
        const purchaseCourses = user.purchased_courses;
        const verifiedPurchasedCourses = [];
        for (let i = 0; i < purchaseCourses.length; i++) {
            const tokenId = purchaseCourses[i].token_id
            console.log(tokenId);
            try {
                if (await checkIfPurchasedCourse(body.address, tokenId)){
                    verifiedPurchasedCourses.push(tokenId);
                }
            } catch (error) {
                console.error("error in checkIfPurchasedCourse inside getPurchasedCourseQuery: ", error);
                return Promise.reject([500, 'checkIfPurchasedCourse in getPurchasedCourseQuery failed for tokenId : ', tokenId]);
            }
        }
        const response = await CourseModel.find({ course_token: { $in: verifiedPurchasedCourses } });
        console.log(response);
        return Promise.resolve({ status: true, response:response})
    }
    catch(err){
        return Promise.reject([500, 'Internal Server Error'])
    }
}

const getAuthoredCourseQuery = async(body)=>{
    try{
        // const response = await CourseModel.find({course_name:body.course_name});
        const user = await User.findOne({ wallet_address: body.address });
        if (!user) {
            return Promise.reject([404, 'User not found']);
        }
        const authoredCourses = user.authored_courses;
        const verifiedAuthoredCourses = [];
        for (let i = 0; i < authoredCourses.length; i++) {
            const tokenId = authoredCourses[i].token_id
            console.log(tokenId);
            try {
                const owner = await checkOwnership(tokenId);
                if (body.address == owner){
                    verifiedAuthoredCourses.push(tokenId);
                }
            } catch (error) {
                console.error("error in checkOwnership inside getAuthoredCourseQuery: ", error);
                return Promise.reject([500, 'checkOwnership in getAuthoredCourseQuery failed for tokenId : ', tokenId]);
            }
        }
        const response = await CourseModel.find({ course_token: { $in: verifiedAuthoredCourses } });
        console.log(response);
        return Promise.resolve({ status: true, response:response})
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
        const { course_name, tutor_name, course_price, course_imageUrl, tutor_iconUrl } = body;
        console.log(course_name);
        var tokenId;
        try {
            tokenId = await getCourseNftToken(course_name, tutor_name, course_price);
            console.log("result from getCourseNftToken: ", tokenId);
        } catch (error) {
            console.error("error in getCourseNftToken: ", error);
        }
        console.log("tokenId from blockchain : ", tokenId);

        let doc = {
            course_token: tokenId,
            course_name: body.course_name, 
            course_imageUrl: course_imageUrl,
            tutor_name: tutor_name, 
            tutor_iconUrl: tutor_iconUrl
        }

        const address = "0xa404c8849c20997ee4ba3a4709976d7aa3286398";
        await UserModel.updateOne({ wallet_address: address }, { $push: { authored_courses: { token_id: tokenId } } });
        console.log(doc)
        const response = await CourseModel.create(doc);
        console.log(response)
        return Promise.resolve({ status: true, response:response})
    }
    catch(err){
        return Promise.reject([500, 'Internal Server Error in addCourseQuery function'])
    }
}

const addModuleQuery = async(body)=>{
    try{
        // const address = "0xA404C8849C20997EE4ba3A4709976d7Aa3286398";
        // console.log(address);
        console.log(body);

        const response = await CourseModel.updateOne(
            { course_token: body.course_token }, 
            { $push: { modules: { module_name: body.module_name, videos_of_module: [] } } }
        );

        console.log(response)
        return Promise.resolve({ status: true, response:response})
    }
    catch(err){
        return Promise.reject([500, 'Internal Server Error in addModuleQuery function'])
    }
}

const purchaseCourseQuery = async(body)=>{
    try{
        const response = await purchaseCourse(body.address, body.token_id);
        await UserModel.updateOne({ course_token: body.token_id }, { $push: { purchased_courses: { token_id: tokenId } } });
        return Promise.resolve({ status: true,response:response})
    }
    catch(err){
        return Promise.reject([500, 'Internal Server Error'])
    }
}

module.exports = {
    uploadToLighhouseQuery,
    getAllCourseQuery,
    getCourseByNameQuery,
    getPurchasedCourseQuery,
    getAuthoredCourseQuery,
    addCourseQuery,
    addModuleQuery,
    purchaseCourseQuery
}