const {addVideoQuery, getVideoQuery, purchaseVideoQuery } = require('../Queries/videoQuery')

const addVideoController = async(req,res) => {
    try {
        console.log("working controller");
        const resp = await addVideoQuery(req.body)
        res.status(200).json(resp);
        console.log("working after query");
        
    } catch (error) {
        console.log(error);
    }
}

const getVideoController = async(req,res)=>{
    try {
        const resp = await getVideoQuery(req)
        res.status(200).json(resp);
    } catch (error) {
        res.json(error);
    }
}

const purchaseVideo = async(req,res)=>{
    try {
        const resp = await purchaseVideoQuery(req.body)
        res.status(200).json(resp);
    } catch (error) {
        res.json(error);
    }
}

module.exports = {
    addVideoController,
    getVideoController,
    purchaseVideo
}