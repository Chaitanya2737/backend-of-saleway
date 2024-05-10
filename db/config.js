const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://chaitanyasatarkar123:Chaitanya@cluster0.c6dlbcu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("db connnected")
}).catch((error) => {
    console.log(error)
})

module.exports =  mongoose.connection