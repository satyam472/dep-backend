
const UserModel = require('../Models/userModel');
const {encryptPassword, decryptPassword } = require('../Helpers/encrypt_decrypt')

const signinUserQuery = async(req,body) => {

    try{
        console.log(body)
        const user = await UserModel.findOne({email_id:body.email_id});
        if(user){
            let checkPassword = decryptPassword(body.password,user.password);
            if(checkPassword){
                return Promise.resolve({status:true,msg:"login successfully",session:req.session});
            }
            else{
                return Promise.resolve({status:false,msg:"password is incorrect"});
            }
        }
        else{
            return Promise.resolve({status:false,msg:"please first rigister then try to login"});
        }
    }
    catch(err){
        return Promise.reject([500, 'Internal Server Error'])
    }
}

const signupUserQuery = async(req,body)=>{
    try{
        console.log(body)
        let encryptpassword = encryptPassword(body.password);
        let doc = {
            first_name: body.first_name,
            last_name: body.last_name ,
            email_id: body.email_id,
            password: encryptpassword,
        }
        const user = await UserModel.create(doc);
        console.log(user)
        return Promise.resolve({ status: true,msg:"registration complited",session:req.session})
    }
    catch(err){
        return Promise.reject({status:false,msg:"please try different emailId"})
    }
}

module.exports = {
    signinUserQuery,
    signupUserQuery
}