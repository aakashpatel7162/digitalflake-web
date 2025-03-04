const express=require("express")
const routes=express.Router()
const  {register}=require("../controllers/authControllers")
const  {login}=require("../controllers/authControllers")

routes.post("/register" ,register)
routes.post("/login" ,login)

module.exports = routes;
