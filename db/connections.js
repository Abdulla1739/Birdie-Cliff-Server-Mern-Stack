const mongoose = require("mongoose");

const connection_string = process.env.CONNECTION_STRING;

mongoose.connect(connection_string).then(() => {
    console.log("MongoDB Atlas connected with pfserve");
}).catch((err) => {
    console.log("Connection failed");
    console.log(err);
});
