const express = require('express')
const app = express()
const PORT = 3000;
const mongoose = require("mongoose")
const dotenv =require("dotenv")
const authRoute = require("./routes/auth")
dotenv.config()
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("DB connection Succesful")).catch(err=> console.log(err));

app.use(express.json())

app.use('/api/auth',authRoute)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
