const express=require("express")
const cors=require("cors")
 const bodyParser = require('body-parser');
 const dotenv = require('dotenv');
  const PORT=process.env.PORT ||10000
  const connectDB = require("./config/db");
  const authRoutes=require("./routes/authRoutes");
const categoryRoutes=require("./routes/categoryRoutes")
const  subcategoryRoutes=require("./routes/subcategoryRoutes")
const  productRoutes=require("./routes/productRoutes")

const app=express()
 app.use(cors()),
 app.use(bodyParser.json())
 app.use(express.json());
 dotenv.config();
 connectDB();

 app.use("/api",authRoutes)
 app.use('/api/categories', categoryRoutes); 
app.use('/api/subcategories', subcategoryRoutes); 
app.use('/api/products', productRoutes); 
app.post('/register', (req, res) => {
   res.send('Register route working');
 });

 app.listen(PORT,()=>{
    return console.log("app is run on port",PORT)
 })
