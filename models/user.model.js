let mongoose=require("mongoose")
let userSchema=mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    confirm_password:{type:String,required:true}
})

let usermodel=mongoose.model("user",userSchema)

module.exports={
    usermodel
}