const bcrypt = require('bcrypt');

const encryptPassword = (password) => {
        const salt = bcrypt.genSaltSync(8);
        const hash = bcrypt.hashSync(password, salt);
        return hash
    }

const decryptPassword = (password, originalPassword) => {
        const comparepassword = bcrypt.compareSync(password, originalPassword);
        return comparepassword
    }

module.exports={
    encryptPassword,
    decryptPassword
}