const express = require('express')
const app = express()
const cors = require("cors")
const port = 5000
const Jwt = require("jsonwebtoken")
app.use(cors())
require("./db/config");
const user = require("./model/user");
// const user = require('./model/user');

app.use(express.json())


app.use("/api/auth" , require("./routes/user"))

app.get("/" ,(req , res)=>{
    res.send("api working ")
})




app.listen(port, () => console.log(`Example app listening on port ${port}!`))