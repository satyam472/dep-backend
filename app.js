const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const { myContract } = require("./Helpers/web3")
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
app.use(cors());

// db connection start---------------
// mongoose.set('strictQuery', true);
const database = process.env.MONGOLAB_URI;
console.log("database env param", database);
mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('db connect'))
.catch(err => console.log(err));
// db connection closed**************

app.use(express.urlencoded({ extended: false }));
app.use("/user", require("./Routes/userRoute"));
app.use("/course", require("./Routes/courseRoute"));
app.use("/video", require("./Routes/videoRoute"));
app.use("/access", require("./Routes/accessRoute"));


const getIdeaFromBlockchain = async(_key) => {
    // console.log(myContract);
    const idea = await myContract.methods.tokenURI(_key).call((error, result) => {
        if (error) {
            console.error("error in myContract.methods.tokenURI : ", error);
        } else {
            console.log("result from callback function of myContract.methods.tokenURI : ", result);
        }
    });
    let encodedString = idea.split(",")[1];
    // console.log(encodedString);
    // let decodedString = Buffer.from(encodedString, "base64").toString("utf8");
    let decodedString = Buffer.from(encodedString, "base64");
    console.log(decodedString);    
    console.log(decodedString.toString("utf8"));
    return;
}

getIdeaFromBlockchain(1);

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log("Server started at http://localhost:" + PORT))