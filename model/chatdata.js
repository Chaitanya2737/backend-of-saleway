const mongoose = require("mongoose");

const rowdata = new mongoose.Schema({
    value1 : {
        type: Number
    },
    value2 : {
        type: Number
    }
})


module.exports = mongoose.model("chartData", rowdata);
