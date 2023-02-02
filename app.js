const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
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

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log("Server started at http://localhost:" + PORT))