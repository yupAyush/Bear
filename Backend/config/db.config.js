const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const env = process.env.URL
if (!env) {
    console.log("url found")
}


mongoose.connect(process.env.URL || "mongodb://127.0.0.1:27017/bearDB").then(() => console.log("database connected ")).catch((error) => console.log(error))

module.exports = mongoose