const mongoose=  require("mongoose")

const product = new mongoose.Schema({
    Product:{
        type : String
    },

    sold_amount :{
        type : Number
    },
    unit_price : {
        type : Number
    },
    revenue : {
        type : Number
    },
    rating : {
        type : Number
    }
})


module.exports =  mongoose.model("product" ,  product)