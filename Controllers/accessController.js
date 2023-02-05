const { checkOwnershipQuery, getUserRoleQuery } = require('../Queries/accessQuery')

const checkOwnership = async(req,res) => {
    try {
        const resp = await checkOwnershipQuery(req.body)
        res.status(200).json(resp);        
    } catch (err) {
        console.log("error in calling checkOwnershipQuery function", err);
    }
}

const getUserRole = async(req,res) => {
    try {
        const resp = await getUserRoleQuery(req.body)
        res.status(200).json(resp);        
        
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    checkOwnership,
    getUserRole
}