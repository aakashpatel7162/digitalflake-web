const express=require("express")
const routes=express.Router()

routes.get("/register" ,register)
routes.get("/login" ,login)



model.export=routes