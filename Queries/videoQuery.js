const lighthouse = require('@lighthouse-web3/sdk');
const CourseModel = require("../Models/courseModel");
const { getVideoNftToken, purchaseVideo } = require("../Helpers/web3");

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
        const videoImageResp = await uploadToLighhouseQuery(body.video_image);
        const uploadVideo = await uploadToLighhouseQuery(body.video);

        if(videoImageResp.status && uploadVideo.status){
            let videoImageurl = `https://ipfs.io/ipfs/${videoImageResp.response.data.Hash}`;
            let videoUrl = `https://ipfs.io/ipfs/${uploadVideo.response.data.Hash}`;

            var tokenId;
            try {
                tokenId = await getVideoNftToken(body.course_token, body.module_name, body.video_name, videoImageurl, videoUrl, body.video_price);
                console.log("result from getCourseNftToken: ", tokenId);
            } catch (error) {
                console.error("error in getCourseNftToken: ", error);
            }
            console.log("tokenId from blockchain : ", tokenId);

            let videoData = {
                video_token: tokenId,
                video_name: body.video_name,
                video_imageUrl: videoImageurl,
                video_url: videoUrl,
                video_price: body.video_price   
            }
            console.log(videoData);
            // const response = await CourseModel.updateOne({ course_token:body.course_token }, { module_name:body.module_name }, { $push: { videos_of_module: videoData} });
            const response = await CourseModel.updateOne(
                { 
                    course_token: body.course_token, 
                    'modules.module_name': body.module_name 
                }, 
                { 
                    $push: { 
                    'modules.$.videos_of_module': videoData
                    } 
                }
            );
            return Promise.resolve({ status: true, response:response})
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

const purchaseVideoQuery = async(body)=>{
    try{
        const response = await purchaseVideo(body.address, body.token_id);
        return Promise.resolve({ status: true,response:response})
    }
    catch(err){
        return Promise.reject([500, 'Internal Server Error'])
    }
}

module.exports = {
    addVideoQuery,
    getVideoQuery,
    purchaseVideoQuery
}