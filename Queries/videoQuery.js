const lighthouse = require('@lighthouse-web3/sdk');
const CourseModel = require("../Models/courseModel");

const uploadVideoToLighhouseQuery = async() => {
    try{
        const path = "C:/Users/Satyam/Desktop/data-dao-backend/VIDEOS/video-1.mp4"; 
        // const path = "../VIDEOS/video-1.mp4"; 
        const apiKey = process.env.API_KEY; 
        const response = await lighthouse.upload(path, apiKey);
        console.log(response);
        return Promise.resolve({status:true,response:response});
    }
    catch(err){
        return Promise.reject([500, 'Internal Server Error'])
    }
}
const addVideoQuery = async(body) => {
    try{
        const uploadVideo = await uploadVideoToLighhouseQuery();
        if(uploadVideo.status){
            let video_url = `https://ipfs.io/ipfs/${uploadVideo.response.data.Hash}`
            let moduleData = {
                module_name: body.module_name,
                videos_of_module: [
                    {
                        video_name: body.video_name,
                        video: video_url,
                        video_image: body.video_image 
                    }
                ]
    
            }
            const response = await CourseModel.updateOne({ course_name:body.course_name}, { $push: { modules: moduleData} })
            return Promise.resolve({status:true,response:response});
        }
        else{
            throw error;
        }
    }
    catch(err){
        return Promise.reject([500, 'Internal Server Error'])
    }
}

const getVideoQuery = async(req)=>{
    try{
        let allCid = []
        const PUBLIC_KEY = process.env.PUBLIC_KEY; 
        const response = await lighthouse.getUploads(PUBLIC_KEY);
        await response.data.uploads.forEach(element => {
            allCid.push({cid:element.cid});
        });

        return Promise.resolve({ status: true,response:allCid})
    }
    catch(err){
        return Promise.reject([500, 'Internal Server Error'])
    }
}

module.exports = {
    addVideoQuery,
    getVideoQuery
}