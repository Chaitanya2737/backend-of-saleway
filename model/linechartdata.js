const mongoose =  require("mongoose")

const data =  new mongoose.Schema({
    time : {
        type : Date
    },
    value1 : {
        type : Number
    }, 
    value2 : {
       type : Number 
    }
})

module.exports= mongoose.model("linechart" , data)