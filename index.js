const express=require("express")
const app=express()
let cors=require ("cors")
require("dotenv").config()

let{connection}=require("./config/db")
let {UserRoute}=require("./routes/user.routes")
let {EmployeeRouter }=require("./routes/employee.routes")
let {authMiddleware}=require("./middlewares/authmiddleware")

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Backend route check")
})

app.use("/",UserRoute)
app.use(authMiddleware)
app.use("/",EmployeeRouter)


app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log(`server is running on port ${process.env.port}`);
        console.log("connected to mongodb ")
    }catch(error){
        console.log(error)
    }
})