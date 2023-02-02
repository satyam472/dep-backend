const {addVideoQuery, getVideoQuery } = require('../Queries/videoQuery')

const addVideoController = async(req,res) => {
    try {
        console.log("working controller");
        await addVideoQuery(req.body.body)
        .then((resp) => {
            res.status(200).json(resp);
        });
        console.log("working after query");
        
    } catch (error) {
        console.log(error);
    }
}

const getVideoController = async(req,res)=>{
    try {
        await getVideoQuery(req)
        .then((resp) => {
            res.status(200).json(resp);
        });
        
    } catch (error) {
        res.json(error);
    }
}

module.exports = {
    addVideoController,
    getVideoController
}