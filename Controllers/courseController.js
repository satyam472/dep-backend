const {getAllCourseQuery, getCourseByNameQuery, addCourseQuery } = require('../Queries/courseQuery')

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
        await getCourseByNameQuery(req.body.body)
        .then((resp) => {
            res.status(200).json(resp);
        });
        
    } catch (error) {
        res.json(error);
    }
}

const addCourseController = async(req,res)=>{
    try {
        await addCourseQuery(req.body.body)
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
    addCourseController
}