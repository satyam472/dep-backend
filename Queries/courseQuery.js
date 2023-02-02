const CourseModel = require("../Models/courseModel");

const getAllCourseQuery = async() => {
    try{
        const response = await CourseModel.find({});
        return Promise.resolve({status:true,response:response});
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
        let doc = {
            course_name:body.course_name, 
            image:body.image,
            tutor_name:body.tutor_name, 
            tutor_icon:body.tutor_icon
        }
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
    addCourseQuery
}