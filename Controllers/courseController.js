const {getAllCourseQuery, getCourseByNameQuery, getPurchasedCourseQuery, getAuthoredCourseQuery, addCourseQuery, addModuleQuery, purchaseCourseQuery } = require('../Queries/courseQuery')
const lighthouse = require('@lighthouse-web3/sdk');
const fs = require('fs');

const getAllCourseController = async(req,res) => {
    try {
        console.log(req.body);
        const resp = await getAllCourseQuery(req.body)
        res.status(200).json(resp);        
    } catch (error) {
        console.log(error);
    }
}

const getCourseByNameController = async(req,res)=>{
    try {
        await getCourseByNameQuery(req.body)
        .then((resp) => {
            res.status(200).json(resp);
        });
        
    } catch (error) {
        res.json(error);
    }
}

const getPurchasedCourses = async(req, resp) => {
    try {
        await getPurchasedCourseQuery(req.body)
        .then((resp) => {
            res.status(200).json(resp);
        });
        
    } catch (error) {
        res.json(error);
    }
}

const getAuthoredCourses = async(req, resp) => {
    try {
        await getAuthoredCourseQuery(req.body)
        .then((resp) => {
            res.status(200).json(resp);
        });
        
    } catch (error) {
        res.json(error);
    }
}

const deleteFileAfterUpload = path =>{
    fs.unlink(path, (err) => {
        if (err) throw err;
        console.log(`${path} was successfully deleted.`);
    });
}
const addCourseController = async(req,res)=>{
    try {
        console.log(req.body);
        const course_image = req.files[0];
        const tutor_icon = req.files[1];
        // console.log(req.files);
        const apiKey = process.env.API_KEY; 
        console.log(apiKey);
        console.log(course_image);
        const courseFilePath = '/Users/shubham/DEP/dep-backend/public/' + course_image.originalname;
        fs.writeFileSync(courseFilePath, course_image.buffer);
        const courseImage = await lighthouse.upload(courseFilePath, apiKey);
        deleteFileAfterUpload(courseFilePath);
        console.log(courseImage);
        let courseImageUrl = `https://ipfs.io/ipfs/${courseImage.data.Hash}`;

        // const fileArray = Array.from(new Uint8Array(tutor_icon.buffer));

        // Write the buffer to a file
        const tutorIconFilePath = '/Users/shubham/DEP/dep-backend/public/' + tutor_icon.originalname;
        fs.writeFileSync(tutorIconFilePath, tutor_icon.buffer);

        // Call the lighthouse.upload function with the file path
        // lighthouse.upload(filePath, apiKey);
        const tutorIcon = await lighthouse.upload(tutorIconFilePath, apiKey);
        deleteFileAfterUpload(tutorIconFilePath);
        console.log(tutorIcon);
        let tutorIconUrl = `https://ipfs.io/ipfs/${tutorIcon.data.Hash}`;
        req.body.course_imageUrl = courseImageUrl;
        req.body.tutor_iconUrl = tutorIconUrl;
        await addCourseQuery(req.body)
        .then((resp) => {
            res.status(200).json(resp);
        });
        
    } catch (error) {
        console.error(error);
        res.json(error);
    }
}

const addModule = async(req,res)=>{
    try {
        // console.log(req);
        console.log(req.body);
        await addModuleQuery(req.body)
        .then((resp) => {
            res.status(200).json(resp);
        });
        
    } catch (error) {
        res.json(error);
    }
}

const purchaseCourse = async(req,res)=>{
    try {
        const resp = await purchaseCourseQuery(req.body)
        res.status(200).json(resp);
    } catch (error) {
        res.json(error);
    }
}


module.exports = {
    getAllCourseController,
    getCourseByNameController,
    getPurchasedCourses,
    getAuthoredCourses,
    addCourseController,
    addModule,
    purchaseCourse
}