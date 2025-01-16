const express=require("express")
const cors=require("cors")
 const bodyParser = require('body-parser');
 const dotenv = require('dotenv');
  const PORT=process.env.PORT||8000
 const app=express(json())

const authroutes=require("./routes/authRoutes")
 app.use(cors()),
 app.use(bodyParser.json())

 app.use("/api",authroutes )
 app.listen(PORT,()=>{
    return console.log("app is run on port",PORT)
 })
