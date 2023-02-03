const { getVideoAccessByTokenQuery, getPurchasedCoursesQuery } = require('../Queries/accessQuery')

const getVideoByToken = async(req,res) => {
    try {
        await getVideoByTokenQuery(req.body.body)
        .then((resp) => {
            res.status(200).json(resp);
        });
        
    } catch (error) {
        console.log(error);
    }
}

const getPurchasedCourses = async(req,res) => {
    try {
        await getPurchasedCoursesQuery(req.body.body)
        .then((resp) => {
            res.status(200).json(resp);
        });
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getVideoByToken,
    getPurchasedCourses
}