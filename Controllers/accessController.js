const { getVideoAccessByTokenQuery } = require('../Queries/accessQuery')

const checkVideoAccessController = async(req,res) => {
    try {
        await getVideoAccessByTokenQuery(req.body.body)
        .then((resp) => {
            res.status(200).json(resp);
        });
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    checkVideoAccessController
}