const {getAllCourseQuery, getCourseByNameQuery, getPurchasedCourseQuery, getAuthoredCourseQuery, addCourseQuery } = require('../Queries/courseQuery')

const getAllCourseController = async(req,res) => {
    try {
        await getAllCourseQuery()
        .then((resp) => {
            res.status(200).json(resp);
        });
        
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


const addCourseController = async(req,res)=>{
    try {
        await addCourseQuery(req.body)
        .then((resp) => {
            res.status(200).json(resp);
        });
        
    } catch (error) {
        res.json(error);
    }
}

module.exports = {
    getAllCourseController,
    getCourseByNameController,
    getPurchasedCourses,
    getAuthoredCourses,
    addCourseController
}