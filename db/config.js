const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/salesway").then(()=>{
    console.log("db connnected")
}).catch((error) => {
    console.log(error)
}) // add your mongoDB collection with your connecting url

module.exports =  mongoose.connection