
const {signinUserQuery, signupUserQuery } = require('../Queries/userQuery')


const signinController = async(req,res) => {
    try {
        await signinUserQuery(req,req.body.body)
        .then((resp) => {
            res.status(200).json(resp);
        });
        
    } catch (error) {
        console.log(error);
    }
}

const signupController = async(req,res)=>{
    try {
        await signupUserQuery(req,req.body.body)
        .then((resp) => {
            res.status(200).json(resp);
        });
        
    } catch (error) {
        res.json(error);
    }
}

module.exports = {
    signinController,
    signupController
}